import { Schema, model } from 'mongoose';
import { ILoan } from './LoanAC.interfaces';

const loanACSchema = new Schema<ILoan>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Loan A/C"],
      default: "Loan A/C",
    },
    accountNo: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: Number,
      default: 1,
    },
    interestRate: {
      type: Number,
      default: 12,
    },
    totalLoan: {
      type: Number,
      default: 0,
    },
    interest: {
      type: Number,
      default: 0,
    },
    depositAmount: {
      type: Number,
      default: 0,
    },
    withdrawAmount: {
      type: Number,
      default: 0,
    },
    maturityDate: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    transactionRef: [
      {
        type: Schema.Types.ObjectId,
        ref: "TransactionAC",
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive", "Closed"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export const LoanAC = model<ILoan>('LoanAC', loanACSchema);
