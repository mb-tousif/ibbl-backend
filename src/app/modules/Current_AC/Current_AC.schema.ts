
import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface ICurrent_AC {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const Current_ACSchema = new Schema<ICurrent_AC>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});

// 3. Create a Model.
const Current_AC = model<ICurrent_AC>('Current_AC', Current_ACSchema);
