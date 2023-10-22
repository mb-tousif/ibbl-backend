import mongoose from "mongoose";
import { generateOTP } from "../../../utils/otpGenerator";
import { TUser } from "./User.interfaces";
import { User } from "./User.schema";
import { EmailService } from "../../../utils/nodemailer";
import { jwtHelpers } from "../../../shared/jwtHelper";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

const createUser = async ( payload:TUser ) => {
    payload.OTP = await generateOTP();
    const user = await User.create(payload);
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await EmailService.sendOTPCode( payload?.name?.firstName, payload?.email, user?.OTP as number );
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
    const { id: userId, email: userEmail, role } = user;
    const accessToken = jwtHelpers.createToken(
      { userId, userEmail, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return accessToken;
}

export const UserService = {
    createUser,
};
