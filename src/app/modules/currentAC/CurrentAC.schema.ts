import { Schema, model } from 'mongoose';
import { ICurrent } from './CurrentAC.interfaces';

const CurrentACSchema = new Schema<ICurrent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Current A/C"],
      default: "Current A/C",
    },
    accountNo: {
      type: String,
      required: true,
      unique: true,
    },
    interestRate: {
      type: Number,
      default: 5,
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
    transactionRef: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    company: {
      type: String,
      required: true,
    },
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

export const CurrentAC = model<ICurrent>('CurrentAC', CurrentACSchema);
