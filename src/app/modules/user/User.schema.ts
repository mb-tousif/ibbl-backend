import { Schema, model } from 'mongoose';
import config from '../../../config';
import bcrypt from 'bcrypt';
import { ENUM_USER_ROLE } from '../../../constant/userRole';
import { TUser, UserModel } from './User.interfaces';
import { ENUM_USER_STATUS } from './User.constants';

const userSchema = new Schema<TUser>(
  {
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
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    DOB: {
      type: String,
      required: true,
    },
    accountNo: {
      type: String,
      default: "Not Assigned",
    },
    img: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg",
    },
    contactNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "user",
        "account_holder",
        "admin",
        "manager",
        "cashier",
        "CEO",
        "defaulter",
      ],
      default: ENUM_USER_ROLE.USER,
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
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending", "Blocked"],
      default: ENUM_USER_STATUS.PENDING,
    },
    failedLoginAttempts: { type: Number, default: 0 },
    changePassword: { type: Boolean, default: false },
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