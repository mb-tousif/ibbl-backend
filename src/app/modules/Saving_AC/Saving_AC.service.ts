import httpStatus from "http-status";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { ISaving, SavingACSearchFields, TSavingACFilterableFields } from "./Saving_AC.interfaces";
import { SavingAC } from "./Saving_AC.schema";
import { User } from "../user/User.schema";
import { ENUM_Account_Type } from "../../../constant/accountEnum";
import generateUserAccount from "../../../utils/generateAccountNo";
import { ENUM_USER_ROLE } from "../../../constant/userRole";
import { BankSummary } from "../bankSummary/BankSummary.schema";
import config from "../../../config";
import { IPaginationOptions } from "../../../types/paginationType";
import { paginationHelpers } from "../../../shared/paginationHelpers";
import { SortOrder } from "mongoose";

const createSavingAC = async (payload: ISaving) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }
  const isAccountExits = await SavingAC.findOne({ userId: payload.userId });
  if (isAccountExits) {
    throw new ServerAPIError( httpStatus.BAD_REQUEST, "Saving account already exits");
  }

  const accountNumber = await generateUserAccount( ENUM_Account_Type.SAVING );
  await User.findByIdAndUpdate(
    { _id: isUserExist._id },
    { accountNo: accountNumber, role: ENUM_USER_ROLE.ACCOUNT_HOLDER })
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
  return (await SavingAC.create(payload)).populate("userId");
};

// Get all Saving AC
const getAllSavingAC = async (options: IPaginationOptions, filters:TSavingACFilterableFields ) => {
  const { search, ...filtersData } = filters;
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

   if (search) {
    andConditions.push({
      $or: SavingACSearchFields.map((field) => ({
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
  const savingAC = await SavingAC.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions)
    .populate("userId");
  const total = await SavingAC.countDocuments(whereConditions);
  return {
    meta: {
      total,
      limit,
      page,
    },
    data: savingAC,
  };
}

// Get Saving AC by id
const getSavingACById = async (savingACId: string) => {
  const savingAC = await SavingAC.findById(savingACId).populate("userId");
  if (!savingAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Saving A/C not found");
  }
  return savingAC;
}

// get my ac
const getMyAC = async (userId: string) => {
  const myAccount = await SavingAC.findOne({ userId }).populate("userId");
  if (!myAccount) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "You don't have any AC");
  }
  return myAccount;
};

// Update Saving AC by id
const updateSavingACById = async (savingACId: string, payload: Partial<ISaving>) => {
  const savingAC = await SavingAC.findById(savingACId);
  if (!savingAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Saving A/C not found");
  }
  if (payload.depositAmount) {
    await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalCredit : payload.depositAmount, totalCapital: payload.depositAmount } });
  }
  if (payload.withdrawAmount) {
    await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalDebit : payload.withdrawAmount, totalCapital: -payload.withdrawAmount } });
  }
  return await SavingAC.findByIdAndUpdate({ _id: savingACId }, payload).populate(
    "userId"
  );
}


export const SavingACService = {
  createSavingAC,
  getAllSavingAC,
  getSavingACById,
  getMyAC,
  updateSavingACById,
};
