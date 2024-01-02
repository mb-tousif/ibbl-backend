import { Schema, model} from 'mongoose';
import { IAccount } from './AccountType.interfaces';

const accountTypeSchema = new Schema<IAccount>({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  accountType: {
    type: String,
    enum: [
      "Savings A/C",
      "Current A/C",
      "Salary A/C",
      "Student A/C",
      "Business A/C",
    ],
  },
  accountNo: { type: String, required: true },
  balance: { type: Number, required: true },
},{
  timestamps: true,
});

// 3. Create a Model.
export const AccountType = model<IAccount>('AccountType', accountTypeSchema);
