import { Types } from "mongoose";

export interface ITransaction {
  id?: string;
  userId: Types.ObjectId;
  receiverId: Types.ObjectId;
  amount: number;
  description: string;
}
