import { Schema, model } from "mongoose";

export interface ISubscriber {
  email: string;
}

const subscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Subscriber = model<ISubscriber>("Subscriber", subscriberSchema);
