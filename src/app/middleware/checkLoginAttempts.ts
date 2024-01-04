import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user/User.schema";
import ServerAPIError from "../../errorHandling/serverApiError";
import httpStatus from "http-status";
import { ENUM_USER_STATUS } from "../modules/user/User.constants";

export const checkLoginAttempts = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (user && user.failedLoginAttempts >= 3) {
        await User.findByIdAndUpdate(user._id, { changePassword: true, confirmedAccount: false, status: ENUM_USER_STATUS.PENDING });
        throw new ServerAPIError(
          httpStatus.LOCKED,
          "Your account is locked, please change your password"
        );
      }
      next();  
    } catch (error) {
        next(error);
    }
}

