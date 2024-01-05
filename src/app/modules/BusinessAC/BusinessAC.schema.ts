
import { Schema, model } from 'mongoose';
import { ISaving } from './Saving_AC.interfaces';

const BusinessACSchema = new Schema<ISaving>(
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
      default: 1,
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
    maturityDate: {
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

export const BusinessAC = model<ISaving>('BusinessAC', BusinessACSchema);
