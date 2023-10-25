import { Types } from "mongoose";

export interface IDeposits {
  userId: Types.ObjectId;
  totalDeposit: number;
  accountNo: string;
  amount: number[];
}
