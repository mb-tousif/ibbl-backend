
import { Schema, model } from 'mongoose';
import { IStaffAC } from './StaffAC.interfaces';

const staffACSchema = new Schema<IStaffAC>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Staff A/C"],
      default: "Staff A/C",
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
    company: {
      type: String,
      default: "Infix Bank of Bangladesh Ltd (IBBL)",
    },
    transaction: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
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

export const StaffAC = model<IStaffAC>('StaffAC', staffACSchema);
