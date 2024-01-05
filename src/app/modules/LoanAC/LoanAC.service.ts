
import httpStatus from "http-status";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { ISaving, LoanACSearchFields, TLoanACFilterableFields } from "./Saving_AC.interfaces";
import { LoanAC } from "./Saving_AC.schema";
import { User } from "../user/User.schema";
import { ENUM_Account_Type } from "../../../constant/accountEnum";
import generateUserAccount from "../../../utils/generateAccountNo";
import { ENUM_USER_ROLE } from "../../../constant/userRole";
import { BankSummary } from "../bankSummary/BankSummary.schema";
import config from "../../../config";
import { IPaginationOptions } from "../../../types/paginationType";
import { paginationHelpers } from "../../../shared/paginationHelpers";
import { SortOrder } from "mongoose";

const createLoanAC = async (payload: ISaving) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }
  const isAccountExits = await LoanAC.findOne({ userId: payload.userId });
  if (isAccountExits) {
    throw new ServerAPIError( httpStatus.BAD_REQUEST, "Saving account already exits");
  }

  const accountNumber = await generateUserAccount( ENUM_Account_Type.SAVING );
  await User.findByIdAndUpdate(
    { _id: isUserExist._id },
    { accountNo: accountNumber, role: ENUM_USER_ROLE.ACCOUNT_HOLDER })
  payload.accountNo = accountNumber;
  await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalCredit : payload.depositAmount, totalCapital: payload.depositAmount } });
  return (await LoanAC.create(payload)).populate("userId");
};

// Get all Saving AC
const getAllLoanAC = async (options: IPaginationOptions, filters:TLoanACFilterableFields ) => {
  const { search, ...filtersData } = filters;
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

   if (search) {
    andConditions.push({
      $or: LoanACSearchFields.map((field) => ({
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
  const LoanAC = await LoanAC.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions)
    .populate("userId");
  const total = await LoanAC.countDocuments(whereConditions);
  return {
    meta: {
      total,
      limit,
      page,
    },
    data: LoanAC,
  };
}

// Get Saving AC by id
const getLoanACById = async (LoanACId: string) => {
  const LoanAC = await LoanAC.findById(LoanACId).populate("userId");
  if (!LoanAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Saving A/C not found");
  }
  return LoanAC;
}

// Update Saving AC by id
const updateLoanACById = async (LoanACId: string, payload: Partial<ISaving>) => {
  const LoanAC = await LoanAC.findById(LoanACId);
  if (!LoanAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Saving A/C not found");
  }
  if (payload.depositAmount) {
    await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalCredit : payload.depositAmount, totalCapital: payload.depositAmount } });
  }
  if (payload.withdrawAmount) {
    await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalDebit : payload.withdrawAmount, totalCapital: -payload.withdrawAmount } });
  }
  await LoanAC.findByIdAndUpdate({ _id: LoanACId }, payload);
  return await LoanAC.findById(LoanACId).populate("userId");
}


export const LoanACService = {
  createLoanAC,
  getAllLoanAC,
  getLoanACById,
  updateLoanACById,
};

