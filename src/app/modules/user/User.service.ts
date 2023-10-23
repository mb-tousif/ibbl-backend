import mongoose from "mongoose";
import { EmailService } from "../../../utils/nodemailer";
import { User } from "./User.schema";
import { TUser } from "./User.interfaces";
import { generateOTP } from "../../../utils/otpGenerator";

const createUser = async (payload: TUser) => {
  payload.OTP = await generateOTP();
  const user = await User.create(payload);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
   await EmailService.sendOTPCode(
       payload?.name?.firstName,
       payload?.email,
       user?.OTP as number
    );
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return user;
};

export const UserService = {
    createUser,
};
