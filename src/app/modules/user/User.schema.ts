import { Schema, model } from 'mongoose';
import { TUser } from './User.interfaces';
import config from '../../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    accountNo: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Savings A/C", "Current A/C", "Salary A/C", "Student A/C"],
      default: "Current A/C",
    },
    img: {
      type: String,
      default: "https://i.imgur.com/HeIi0wU.png",
    },
    contactNo: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      enum: [
        "admin",
        "user",
        "cashier",
        "manager",
        "defaulter",
        "premium_user",
      ],
      default: "user",
    },
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
    deposit: {
      type: Number,
      default: 0,
    },
    loan: {
      type: Number,
      default: 0,
    },
    savings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Hash Password
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(config.salt_rounds)
  );
  this.password = hashedPassword;
  next();
});

// 3. Create a Model.
export const User = model<TUser>('User', userSchema);
