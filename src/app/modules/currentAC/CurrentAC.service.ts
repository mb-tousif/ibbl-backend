import httpStatus from "http-status";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { User } from "../user/User.schema";
import { ENUM_Account_Type } from "../../../constant/accountEnum";
import generateUserAccount from "../../../utils/generateAccountNo";
import { ENUM_USER_ROLE } from "../../../constant/userRole";
import { BankSummary } from "../bankSummary/BankSummary.schema";
import config from "../../../config";
import { IPaginationOptions } from "../../../types/paginationType";
import { paginationHelpers } from "../../../shared/paginationHelpers";
import { SortOrder } from "mongoose";
import { ICurrent, TCurrentACFilterableFields } from "./CurrentAC.interfaces";
import { CurrentAC } from "./CurrentAC.schema";
import { CurrentACSearchFields } from "./CurrentAC.constants";

const createCurrentAC = async (payload: ICurrent) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }
  const isAccountExits = await CurrentAC.findOne({ userId: payload.userId });
  if (isAccountExits) {
    throw new ServerAPIError(
      httpStatus.BAD_REQUEST,
      "Current account already exits"
    );
  }

  const accountNumber = await generateUserAccount(ENUM_Account_Type.CURRENT);
  if (isUserExist.role === ENUM_USER_ROLE.USER) {
    await User.findByIdAndUpdate(
      { _id: isUserExist._id },
      { accountNo: accountNumber, role: ENUM_USER_ROLE.ACCOUNT_HOLDER }
    );
  }
  await User.findByIdAndUpdate(
    { _id: isUserExist._id },
    { accountNo: accountNumber }
  );
  payload.accountNo = accountNumber;
  await BankSummary.updateOne(
    { _id: config.capital_transactions_key },
    {
      $inc: {
        totalCredit: payload.depositAmount,
        totalCapital: payload.depositAmount,
        totalAccountHolder: 1,
      },
    }
  );
  return (await CurrentAC.create(payload))
    .populate("userId")
};

// Get all Current AC
const getAllCurrentAC = async (
  options: IPaginationOptions,
  filters: TCurrentACFilterableFields
) => {
  const { search, ...filtersData } = filters;
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: CurrentACSearchFields.map((field) => ({
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
  const currentAC = await CurrentAC.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions)
    .populate("userId");
  const total = await CurrentAC.countDocuments(whereConditions);
  return {
    meta: {
      total,
      limit,
      page,
    },
    data: currentAC,
  };
};

// Get Current AC by id
const getCurrentACById = async (CurrentACId: string) => {
  const currentAC = await CurrentAC.findById(CurrentACId)
    .populate("userId")
    .populate("transactionRef");
  if (!currentAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Current A/C not found");
  }
  return currentAC;
};

// Get My Current AC
const getMyAC = async (userId: string) => {
  const myAccount = await CurrentAC.findOne({ userId })
    .populate("userId")
    .populate("transactionRef");
  if (!myAccount) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Current A/C not found");
  }
  return myAccount;
};

// Update Current AC by id
const updateCurrentACById = async (
  CurrentACId: string,
  payload: Partial<ICurrent>
) => {
  const currentAC = await CurrentAC.findById(CurrentACId);
  if (!currentAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Current A/C not found");
  }
  if (payload.depositAmount) {
    await BankSummary.updateOne(
      { _id: config.capital_transactions_key },
      {
        $inc: {
          totalCredit: payload.depositAmount,
          totalCapital: payload.depositAmount,
        },
      }
    );
  }
  if (payload.withdrawAmount) {
    await BankSummary.updateOne(
      { _id: config.capital_transactions_key },
      {
        $inc: {
          totalDebit: payload.withdrawAmount,
          totalCapital: -payload.withdrawAmount,
        },
      }
    );
  }
  await CurrentAC.findByIdAndUpdate({ _id: CurrentACId }, payload);
  return await CurrentAC.findById(CurrentACId).populate("userId");
};

export const CurrentACService = {
  createCurrentAC,
  getAllCurrentAC,
  getCurrentACById,
  getMyAC,
  updateCurrentACById,
};
