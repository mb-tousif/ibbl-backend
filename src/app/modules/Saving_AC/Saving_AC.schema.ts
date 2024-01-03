import { Schema, model } from 'mongoose';
import { IDeposits } from './Saving_AC.interfaces';

const depositSchema = new Schema<IDeposits>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accountNo: {
    type: String,
    required: true,
  },
  totalDeposit: {
    type: Number,
    default: 0,
  },
  amount: {
    type: [Number],
    required: true,
  },
},
{
  timestamps: true,
});

export const Deposits = model<IDeposits>('Deposits', depositSchema);