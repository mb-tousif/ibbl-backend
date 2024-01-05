
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

export const FixedDepositACSearchFields = ["accountNo", "status", "duration"];

export const FixedDepositACFilterFields = [ "search", "accountNo", "status", "duration", "maturityDate", "interestRate"];

export type TFixedDepositACFilterableFields = {
  search?: string;
  accountNo?: string;
  status?: string;
  duration?: number;
  maturityDate?: string;
  interestRate?: number;
};

