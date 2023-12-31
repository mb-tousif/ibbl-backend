import { Schema, model } from 'mongoose';
import { ISaving } from './Saving_AC.interfaces';

const savingACSchema = new Schema<ISaving>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Savings A/C"],
      default: "Savings A/C",
    },
    accountNo: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    interestRate: {
      type: Number,
      default: 6,
    },
    totalBalance: {
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

export const SavingAC = model<ISaving>('SavingAC', savingACSchema);