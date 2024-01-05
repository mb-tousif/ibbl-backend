
import { Types } from "mongoose";

export interface IStaffAC {
  id?: Types.ObjectId;
  userId: Types.ObjectId;
  accountNo?: string;
  accountType?: string;
  interestRate?: number;
  totalBalance: number;
  interest?: number;
  depositAmount: number;
  withdrawAmount: number;
  transaction?: Types.ObjectId[];
  company?: string;
  status?: string;
}

export type TStaffACFilterableFields = {
  search?: string;
  accountNo?: string;
  status?: string;
  company?: string;
  interestRate?: number;
};

