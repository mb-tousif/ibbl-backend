import mongoose, { SortOrder } from "mongoose";
import { EmailService } from "../../../utils/nodemailer";
import { User } from "./User.schema";
import { TUser, TUserFilterableFields } from "./User.interfaces";
import { generateOTP } from "../../../utils/otpGenerator";
import ServerAPIError from "../../../errorHandling/serverApiError";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../../types/paginationType";
import { paginationHelpers } from "../../../shared/paginationHelpers";
import { userSearchableFields } from "./User.constants";

// create a new user
const createUser = async (payload: TUser) => {
  if (payload.role === "admin" || payload.role === "cashier" || payload.role === "manager" || payload.role === "CEO") {
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
  const users = await User.find(whereConditions).skip(skip).limit(limit);
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

// Update user by id
const updateUserById = async (id: string, payload: Partial<TUser>) => {
  const isUserExist = await User.findById(id);
  if (
    !isUserExist ||
    isUserExist.role === "admin" ||
    isUserExist.role === "cashier" ||
    isUserExist.role === "manager" ||
    isUserExist.role === "CEO"
  ) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }

  const updatedUser = (await User.updateOne({ _id: isUserExist._id }, payload));
  return updatedUser;
};

export const UserService = {
    createUser,
    createManagement,
    getAllUsers,
    updateUserById
};
