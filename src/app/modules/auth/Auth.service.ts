import ServerAPIError from "../../../errorHandling/serverApiError";
import httpStatus from "http-status";
import { TLoginData } from "./Auth.interfaces";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../shared/jwtHelper";
import { TOtpPayload, TUser } from "../user/User.interfaces";
import { User } from "../user/User.schema";
import { ENUM_USER_STATUS } from "../user/User.constants";

// confirmedAccount by OTP
const confirmedAccount = async (payload: TOtpPayload) => {
  const { email, OTP } = payload;
  const user = await User.findOne({ email, OTP });
  if (!user) throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  user.confirmedAccount = true;
  user.status = "Active";
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

      console.log(matchPassword, "matchPassword", payload.password, isConfirmedUser?.password);
      
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

export const AuthService = {
    confirmedAccount,
    loginUser,
};
