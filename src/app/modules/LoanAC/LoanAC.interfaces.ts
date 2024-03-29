
import { Types } from "mongoose";

export interface ILoan {
  id?: Types.ObjectId;
  userId: Types.ObjectId;
  accountNo?: string;
  accountType?: string;
  interestRate?: number;
  totalLoan: number;
  interest?: number;
  loanAmount: number;
  paidAmount: number;
  transactionRef?: Types.ObjectId | string[];
  company?: string;
  duration?: number;
  maturityDate: string;
  status?: string;
}

export type TLoanACFilterableFields = {
  search?: string;
  accountNo?: string;
  status?: string;
  duration?: number;
  maturityDate?: string;
  interestRate?: number;
};

