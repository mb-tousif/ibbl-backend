import { Types } from "mongoose";

export interface ISaving {
  id?: Types.ObjectId;
  userId: Types.ObjectId;
  accountNo?: string;
  accountType?: string;
  totalBalance: number;
  interest?: number;
  depositAmount: number;
  maturityDate: Date;
}
