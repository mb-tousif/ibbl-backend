import mongoose from "mongoose";
import { EmailService } from "../../../utils/nodemailer";
import { User } from "./User.schema";
import { TUser } from "./User.interfaces";
import { generateOTP } from "../../../utils/otpGenerator";
import ServerAPIError from "../../../errorHandling/serverApiError";
import httpStatus from "http-status";

// create a new user
const createUser = async (payload: TUser) => {
  if (payload.role === "admin" || payload.role === "cashier" || payload.role === "manager") {
    throw new ServerAPIError(
      httpStatus.BAD_REQUEST,
      `You can't create ${payload.role} user`
    );
  }
  payload.OTP = await generateOTP();
  const session = await mongoose.startSession();
  try {
    const user = await User.create(payload);
    session.startTransaction();
    await EmailService.sendOTPCode(
      payload?.name?.firstName,
      payload?.email,
      user?.OTP as number
      );
    return user;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

// create a admin, cashier, manager
const createManagement = async (payload: TUser) => {
  if (payload.role === "user") {
    throw new ServerAPIError(
      httpStatus.BAD_REQUEST,
      "This route is not for user"
    );
  }
  payload.OTP = await generateOTP();
  payload.confirmedAccount = true;
  payload.status = "Active";
  const user = await User.create(payload)
  return user;
};

export const UserService = {
    createUser,
    createManagement,
};
