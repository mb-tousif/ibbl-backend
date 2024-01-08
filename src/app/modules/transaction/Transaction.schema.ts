import { Schema, model } from "mongoose";
import { ITransaction } from "./Transaction.interfaces";

// 2. Create a Schema corresponding to the document interface.
const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: { 
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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
