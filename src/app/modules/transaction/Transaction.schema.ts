import { Schema, model } from "mongoose";
import { ITransaction } from "./Transaction.interfaces";

// 2. Create a Schema corresponding to the document interface.
const transactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true },
    receiverId: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// 3. Create a Model.
export const TransactionAC = model<ITransaction>(
  "TransactionAC",
  transactionSchema
);
