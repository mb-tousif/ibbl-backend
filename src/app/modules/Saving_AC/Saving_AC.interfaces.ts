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
