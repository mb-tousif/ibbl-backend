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
  transactionRef?: string | Types.ObjectId[];
  duration?: number;
  maturityDate: string;
  status?: string;
}

export const SavingACSearchFields = ["accountNo", "status", "duration"];

export const SavingACFilterFields = [ "search", "accountNo", "status", "duration", "maturityDate", "interestRate"];

export type TSavingACFilterableFields = {
  search?: string;
  accountNo?: string;
  status?: string;
  duration?: number;
  maturityDate?: string;
  interestRate?: number;
};
