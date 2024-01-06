
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
import { IStaffAC, TStaffACFilterableFields } from "./StaffAC.interfaces";
import { StaffAC } from "./StaffAC.schema";
import { StaffACSearchFields } from "./StaffAC.constants";

const createStaffAC = async (payload: IStaffAC) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }
  const isAccountExits = await StaffAC.findOne({ userId: payload.userId });
  if (isAccountExits) {
    throw new ServerAPIError( httpStatus.BAD_REQUEST, "Account already exits");
  }

  const accountNumber = await generateUserAccount( ENUM_Account_Type.STAFF );
  await User.findByIdAndUpdate(
    { _id: isUserExist._id },
    { accountNo: accountNumber, role: ENUM_USER_ROLE.ACCOUNT_HOLDER })
  payload.accountNo = accountNumber;
  await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalCredit : payload.depositAmount, totalCapital: payload.depositAmount, totalAccountHolder: 1 } });
  return (await StaffAC.create(payload)).populate("userId");
};

// Get all Staff AC
const getAllStaffAC = async (options: IPaginationOptions, filters:TStaffACFilterableFields ) => {
  const { search, ...filtersData } = filters;
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

   if (search) {
    andConditions.push({
      $or: StaffACSearchFields.map((field) => ({
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
  const staffAC = await StaffAC.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions)
    .populate("userId");
  const total = await StaffAC.countDocuments(whereConditions);
  return {
    meta: {
      total,
      limit,
      page,
    },
    data: staffAC,
  };
}

// Get Staff AC by id
const getStaffACById = async (StaffACId: string) => {
  const staffAC = await StaffAC.findById(StaffACId).populate("userId");
  if (!staffAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Staff A/C not found");
  }
  return staffAC;
}

// Update Staff AC by id
const updateStaffACById = async (StaffACId: string, payload: Partial<IStaffAC>) => {
  const staffAC = await StaffAC.findById(StaffACId);
  if (!staffAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Staff A/C not found");
  }
  if (payload.depositAmount) {
    await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalCredit : payload.depositAmount, totalCapital: payload.depositAmount } });
  }
  if (payload.withdrawAmount) {
    await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalDebit : payload.withdrawAmount, totalCapital: -payload.withdrawAmount } });
  }
  await StaffAC.findByIdAndUpdate({ _id: StaffACId }, payload);
  return await StaffAC.findById(StaffACId).populate("userId");
}


export const StaffACService = {
  createStaffAC,
  getAllStaffAC,
  getStaffACById,
  updateStaffACById,
};

