
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

export const BusinessACSearchFields = ["accountNo", "status", "duration"];

export const BusinessACFilterFields = [ "search", "accountNo", "status", "duration", "maturityDate", "interestRate"];

export type TBusinessACFilterableFields = {
  search?: string;
  accountNo?: string;
  status?: string;
  duration?: number;
  maturityDate?: string;
  interestRate?: number;
};

