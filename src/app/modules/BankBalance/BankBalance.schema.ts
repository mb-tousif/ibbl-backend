import { Schema, model } from "mongoose";
import { IBankBalance } from "./BankBalance.interfaces";


// 2. Create a Schema corresponding to the document interface.
const BankBalanceSchema = new Schema<IBankBalance>({
  title: {
    type: String,
    enum: [
      "SavingsAC",
      "CurrentAC",
      "SalaryAC",
      "StudentAC",
      "BusinessAC",
      "LoanAC",
      "FixedDepositAC",
      "StaffAC",
    ],
    required: true,
  },
  accountRef: {
    type: Schema.Types.ObjectId,
    refPath: "title",
    required: true,
  },
  depositAmounts: {
    type: Number,
    default: 0,
  },
  withdrawAmounts: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

// 3. Create a Model.
export const BankBalance = model<IBankBalance>('BankBalance', BankBalanceSchema);
