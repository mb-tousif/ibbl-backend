
import httpStatus from "http-status";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { ISaving, BusinessACSearchFields, TBusinessACFilterableFields } from "./Saving_AC.interfaces";
import { BusinessAC } from "./Saving_AC.schema";
import { User } from "../user/User.schema";
import { ENUM_Account_Type } from "../../../constant/accountEnum";
import generateUserAccount from "../../../utils/generateAccountNo";
import { ENUM_USER_ROLE } from "../../../constant/userRole";
import { BankSummary } from "../bankSummary/BankSummary.schema";
import config from "../../../config";
import { IPaginationOptions } from "../../../types/paginationType";
import { paginationHelpers } from "../../../shared/paginationHelpers";
import { SortOrder } from "mongoose";

const createBusinessAC = async (payload: ISaving) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }
  const isAccountExits = await BusinessAC.findOne({ userId: payload.userId });
  if (isAccountExits) {
    throw new ServerAPIError( httpStatus.BAD_REQUEST, "Saving account already exits");
  }

  const accountNumber = await generateUserAccount( ENUM_Account_Type.SAVING );
  await User.findByIdAndUpdate(
    { _id: isUserExist._id },
    { accountNo: accountNumber, role: ENUM_USER_ROLE.ACCOUNT_HOLDER })
  payload.accountNo = accountNumber;
  await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalCredit : payload.depositAmount, totalCapital: payload.depositAmount } });
  return (await BusinessAC.create(payload)).populate("userId");
};

// Get all Saving AC
const getAllBusinessAC = async (options: IPaginationOptions, filters:TBusinessACFilterableFields ) => {
  const { search, ...filtersData } = filters;
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

   if (search) {
    andConditions.push({
      $or: BusinessACSearchFields.map((field) => ({
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
  const BusinessAC = await BusinessAC.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions)
    .populate("userId");
  const total = await BusinessAC.countDocuments(whereConditions);
  return {
    meta: {
      total,
      limit,
      page,
    },
    data: BusinessAC,
  };
}

// Get Saving AC by id
const getBusinessACById = async (BusinessACId: string) => {
  const BusinessAC = await BusinessAC.findById(BusinessACId).populate("userId");
  if (!BusinessAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Saving A/C not found");
  }
  return BusinessAC;
}

// Update Saving AC by id
const updateBusinessACById = async (BusinessACId: string, payload: Partial<ISaving>) => {
  const BusinessAC = await BusinessAC.findById(BusinessACId);
  if (!BusinessAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Saving A/C not found");
  }
  if (payload.depositAmount) {
    await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalCredit : payload.depositAmount, totalCapital: payload.depositAmount } });
  }
  if (payload.withdrawAmount) {
    await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalDebit : payload.withdrawAmount, totalCapital: -payload.withdrawAmount } });
  }
  await BusinessAC.findByIdAndUpdate({ _id: BusinessACId }, payload);
  return await BusinessAC.findById(BusinessACId).populate("userId");
}


export const BusinessACService = {
  createBusinessAC,
  getAllBusinessAC,
  getBusinessACById,
  updateBusinessACById,
};

