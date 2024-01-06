import { Schema, model } from "mongoose";
import { IBankSummary } from "./BankSummary.interfaces";

// 2. Create a Schema corresponding to the document interface.
const bankSummarySchema = new Schema<IBankSummary>({
  totalUser: {
    type: Number,
    default: 0,
  },
  totalAccountHolder: {
    type: Number,
    default: 0,
  },
  totalInvestment: {
    type: Number,
    default: 0,
  },
  totalCredit: {
    type: Number,
    default: 0,
  },
  totalCapital: {
    type: Number,
    default: 0,
  },
  totalProfit: {
    type: Number,
    default: 0,
  },
  totalExpense: {
    type: Number,
    default: 0,
  },
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
  },
});

// 3. Create a Model.
export const BankSummary = model<IBankSummary>(
  "BankSummary",
  bankSummarySchema
);