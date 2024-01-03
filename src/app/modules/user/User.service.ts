import mongoose, { SortOrder } from "mongoose";
import { EmailService } from "../../../utils/nodemailer";
import { User } from "./User.schema";
import {  TUser, TUserFilterableFields } from "./User.interfaces";
import { generateOTP } from "../../../utils/otpGenerator";
import ServerAPIError from "../../../errorHandling/serverApiError";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../../types/paginationType";
import { paginationHelpers } from "../../../shared/paginationHelpers";
import { userSearchableFields } from "./User.constants";
import { ENUM_USER_ROLE } from "../../../constant/userRole";

// create a new user
const createUser = async (payload: TUser) => {
  if (
    payload.role === ENUM_USER_ROLE.ADMIN ||
    payload.role === ENUM_USER_ROLE.CASHIER ||
    payload.role === ENUM_USER_ROLE.MANAGER ||
    payload.role === ENUM_USER_ROLE.CEO
  ) {
    throw new ServerAPIError(
      httpStatus.BAD_REQUEST,
      `You can't create ${payload.role} user`
    );
  }
  payload.OTP = await generateOTP();
  const session = await mongoose.startSession();
  try {
    const user = await User.create(payload);
    session.startTransaction();
    await EmailService.sendOTPCode(
      payload?.name?.firstName,
      payload?.email,
      user?.OTP as number
      );
    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

// create a admin, cashier, manager
const createManagement = async (payload: TUser) => {
  if (payload.role === "user") {
    throw new ServerAPIError(
      httpStatus.BAD_REQUEST,
      "This route is not for user"
    );
  }
  payload.OTP = await generateOTP();
  payload.confirmedAccount = true;
  payload.status = "Active";
  const user = await User.create(payload)
  return user;
};

// GET all users
const getAllUsers = async (options: IPaginationOptions, filters: TUserFilterableFields) => {
  const { search, ...filtersData } = filters;
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];
  if (search) {
    andConditions.push({
      $or: userSearchableFields.map((field) => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const users = await User.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .select("-password");
  const total = await User.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: users,
  };
};

// Get user by id
const getUserById = async (id: string): Promise<Partial<TUser | null>> => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

// const createAccount = async (payload: ICreateAccountPayload) => {
//   const isUserExist = await User.findById(payload.id);
//   if (!isUserExist) {
//     throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
//   }
//   const accountPayload = payload.accountType.slice(0, 3).toLocaleLowerCase();
//   const accountNo = await generateUserAccount(accountPayload);
//   const user = await User.findByIdAndUpdate(
//     { _id: isUserExist._id },
//     { accountType: payload.accountType, accountNo, role: ENUM_USER_ROLE.ACCOUNT_HOLDER },
//     { new: true }
//   ).select("-password");
//   return user;
// };

// Update user by id
const updateUserById = async (id: string, payload: Partial<TUser>) => {
  const isUserExist = await User.findById(id);
  if (
    !isUserExist
  ) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }

  const { name, ...rest } = payload;
  const restData:Partial<TUser> = {...rest};
  
  if (name && Object.keys(name).length >0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (restData as any)[nameKey] = (name as any)[key];
    });
  }

  const updatedUser = await User.findByIdAndUpdate({ _id: isUserExist._id }, restData,{ new: true }).select("-password");
  return updatedUser;
};

// delete user by id
const deleteUserById = async (id: string) => {
  const isUserExist = await User.findById(id);
  if (
    !isUserExist) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }

  const deletedUser = await User.findByIdAndDelete({ _id: isUserExist._id });
  return deletedUser;
}

export const UserService = {
    createUser,
    createManagement,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
