import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './User.interfaces';
import config from '../../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    accountNo: {
      type: String,
      default: "Not Assigned",
    },
    accountType: {
      type: String,
      enum: ["Savings A/C","Not Chosen", "Current A/C", "Salary A/C", "Student A/C", "Business A/C"],
      default: "Not Chosen",
    },
    img: {
      type: String,
      default: "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
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
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "user",
        "defaulter",
        "account_holder",
      ],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending", "Blocked"],
      default: "Pending",
    },
    OTP: {
      type: Number,
      required: true,
    },
    confirmedAccount: {
      type: Boolean,
      default: false,
    },
    NID: {
      type: String,
      required: true,
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

// Compare Password
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);