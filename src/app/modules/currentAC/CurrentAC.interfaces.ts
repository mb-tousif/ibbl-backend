
import { Types } from "mongoose";

export interface ICurrent {
  id?: Types.ObjectId;
  userId: Types.ObjectId;
  accountNo?: string;
  accountType?: string;
  interestRate?: number;
  totalBalance: number;
  interest?: number;
  depositAmount: number;
  withdrawAmount: number;
  transactionRef?: Types.ObjectId[];
  company?: string;
  status?: string;
}

export type TCurrentACFilterableFields = {
  search?: string;
  accountNo?: string;
  status?: string;
  company?: string;
  interestRate?: number;
};

