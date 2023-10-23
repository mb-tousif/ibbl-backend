import { Types } from "mongoose";

export interface IDeposits {
  userId: Types.ObjectId;
  totalDeposit: number;
  amount: number[];
}
