import { Schema } from "mongoose";

export interface IBankSummary {
  totalUser: number;
  totalAccountHolder: number;
  totalInvestment: number;
  totalCredit: number;
  totalCapital: number;
  totalProfit: number;
  totalExpense: number;
  transactionId: string | Schema.Types.ObjectId;
}