import ServerAPIError from "../../../errorHandling/serverApiError";
import httpStatus from "http-status";
import { TLoginData, TResetPassword } from "./Auth.interfaces";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../shared/jwtHelper";
import { TOtpPayload, TUser } from "../user/User.interfaces";
import { User } from "../user/User.schema";
import { ENUM_USER_STATUS } from "../user/User.constants";
import { generateOTP } from "../../../utils/otpGenerator";
import { EmailService } from "../../../utils/nodemailer";

// confirmedAccount by OTP
const confirmedAccount = async (payload: TOtpPayload) => {
  const { email, OTP } = payload;
  const user = await User.findOne({ email, OTP });
  if (!user) throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  user.confirmedAccount = true;
  user.status = ENUM_USER_STATUS.ACTIVE;
  await user.save();
  return user;
};

// login Service
const loginUser = async (payload: TLoginData) => {
    const isConfirmedUser:TUser | null = await User.findOne({ email: payload.email, confirmedAccount: true });
    if (!isConfirmedUser) throw new ServerAPIError(httpStatus.NOT_FOUND, "User not verified");
    if (isConfirmedUser.status !== ENUM_USER_STATUS.ACTIVE) throw new ServerAPIError(httpStatus.NOT_FOUND, `User is ${isConfirmedUser.status}`);

    const matchPassword = await User.isPasswordMatched(
      payload.password,
      isConfirmedUser?.password as string
    );
    if(matchPassword === false) {
      // if password not matched update failedLoginAttempts
      await User.findByIdAndUpdate(isConfirmedUser._id, {
        $inc: { failedLoginAttempts: 1 },
      });
     throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "Password not matched 💥"
      );
    }
    const { _id, email, role } = isConfirmedUser;
    const accessToken = jwtHelpers.createToken(
      { _id, email, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    const data = {
      id: _id,
      accessToken,
    };
    return data;
}

// changePassword Service
const forgetPasswordRequest = async (payload:{email: string}) => {
  const { email } = payload;
  const user = await User.findOne({ email });
  if (!user) throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  user.changePassword = false;
  user.failedLoginAttempts = 0;
  user.OTP= await generateOTP();
  const newUser = await user.save();
  await EmailService.sendOTPCode(
      newUser?.name?.firstName,
      newUser?.email,
      newUser?.OTP as number
      );
  return newUser;
};

// Reset Password Service
const resetPassword = async (payload: TResetPassword) => {
  const { email, OTP, password } = payload;
  const user = await User.findOne({ email, OTP });
  if (!user) throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  user.confirmedAccount = true;
  user.changePassword = false;
  user.status = ENUM_USER_STATUS.ACTIVE;
  user.failedLoginAttempts = 0;
  user.password = password;
  const newUser = await user.save();
  return newUser;
}

export const AuthService = {
    confirmedAccount,
    loginUser,
    forgetPasswordRequest,
    resetPassword
};
