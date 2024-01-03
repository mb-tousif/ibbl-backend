
import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IBankBalance {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const BankBalanceSchema = new Schema<IBankBalance>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});

// 3. Create a Model.
const BankBalance = model<IBankBalance>('BankBalance', BankBalanceSchema);