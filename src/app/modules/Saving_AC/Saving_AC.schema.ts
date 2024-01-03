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
      default: "Savings A/C",
    },
    accountNo: {
      type: String,
      required: true,
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
    maturityDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SavingAC = model<ISaving>('SavingAC', savingACSchema);