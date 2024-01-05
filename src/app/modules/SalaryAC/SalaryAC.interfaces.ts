
import { Types } from "mongoose";

export interface ISaving {
  id?: Types.ObjectId;
  userId: Types.ObjectId;
  accountNo?: string;
  accountType?: string;
  interestRate?: number;
  totalBalance: number;
  interest?: number;
  depositAmount: number;
  withdrawAmount: number;
  duration?: number;
  maturityDate: string;
  status?: string;
}

export const SalaryACSearchFields = ["accountNo", "status", "duration"];

export const SalaryACFilterFields = [ "search", "accountNo", "status", "duration", "maturityDate", "interestRate"];

export type TSalaryACFilterableFields = {
  search?: string;
  accountNo?: string;
  status?: string;
  duration?: number;
  maturityDate?: string;
  interestRate?: number;
};

