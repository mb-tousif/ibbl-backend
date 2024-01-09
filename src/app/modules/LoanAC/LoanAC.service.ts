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
import { ILoan, TLoanACFilterableFields } from "./LoanAC.interfaces";
import { LoanAC } from "./LoanAC.schema";
import { LoanACSearchFields } from "./LoanAC.constants";

const createLoanAC = async (payload: ILoan) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }
  const isAccountExits = await LoanAC.findOne({ userId: payload.userId });
  if (isAccountExits) {
    throw new ServerAPIError(
      httpStatus.BAD_REQUEST,
      "You already have a Loan."
    );
  }

  const accountNumber = await generateUserAccount(ENUM_Account_Type.LOAN);
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
        totalInvestment: payload.loanAmount,
        totalCapital: -payload.loanAmount,
        totalAccountHolder: 1,
      },
    }
  );
  return (await LoanAC.create(payload)).populate("userId");
};

// Get all Saving AC
const getAllLoanAC = async (
  options: IPaginationOptions,
  filters: TLoanACFilterableFields
) => {
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
  const loanAC = await LoanAC.find(whereConditions)
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
    data: loanAC,
  };
};

// Get Saving AC by id
const getLoanACById = async (loanACId: string) => {
  const loanAC = await LoanAC.findById(loanACId)
    .populate("userId")
    .populate("transactionRef");
  if (!loanAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Loan A/C not found");
  }
  return loanAC;
};

// Get My Loan AC
const getMyAC = async (userId: string) => {
  const loanAC = await LoanAC.findOne({ userId })
    .populate("userId")
    .populate("transactionRef");
  if (!loanAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Loan A/C not found");
  }
  return loanAC;
};

// Update Saving AC by id
const updateLoanACById = async (loanACId: string, payload: Partial<ILoan>) => {
  const loanAC = await LoanAC.findById(loanACId);
  if (!loanAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Loan A/C not found");
  }

  if (payload.loanAmount) {
    await BankSummary.updateOne(
      { _id: config.capital_transactions_key },
      {
        $inc: {
          totalCredit: payload.loanAmount,
          totalCapital: payload.loanAmount,
        },
      }
    );
  }

  if (payload.paidAmount) {
    await BankSummary.updateOne(
      { _id: config.capital_transactions_key },
      {
        $inc: {
          totalDebit: payload.paidAmount,
          totalCapital: -payload.paidAmount,
        },
      }
    );
  }
  return await LoanAC.findByIdAndUpdate({ _id: loanACId }, payload)
    .populate("userId")
    .populate("transactionRef");
};

// give loan and interest
const giveLoan = async (loanACId: string, payload: number) => {
  const loanAC = await LoanAC.findById(loanACId);
  if (!loanAC) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "Loan A/C not found");
  }
  if (payload <= (loanAC.totalLoan ?? 0)) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "You don't have enough loan");
  }
  await LoanAC.findByIdAndUpdate(
    { _id: loanACId },
    {
      $inc: {
        paidAmount: payload,
        totalLoan: -payload,
      },
    }
  );
  await BankSummary.updateOne(
    { _id: config.capital_transactions_key },
    {
      $inc: {
        totalCredit: -payload,
        totalCapital: payload,
      },
    }
  );
  return await LoanAC.findById(loanACId)
    .populate("userId")
    .populate("transactionRef");
}

export const LoanACService = {
  createLoanAC,
  getAllLoanAC,
  getLoanACById,
  getMyAC,
  updateLoanACById,
  giveLoan,
};
