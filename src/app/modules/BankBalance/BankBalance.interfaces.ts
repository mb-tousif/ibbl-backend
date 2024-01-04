import { Schema } from "mongoose";

// Define your interfaces here
export interface IBankBalance {
  id: string;
  title: string;
  accountRef: Schema.Types.ObjectId;
  depositAmounts: number;
  withdrawAmounts: number;
  balance: number;
}