import { Schema, model } from 'mongoose';
import { IDeposits } from './Deposits.interfaces';

const depositSchema = new Schema<IDeposits>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
});

export const Deposits = model<IDeposits>('Deposits', depositSchema);