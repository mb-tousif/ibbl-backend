import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import httpStatus from "http-status";
import { AuthService } from "./Auth.service";
import sendResponse from "../../../shared/responseHandler";

// Verify user OTP
const confirmedAccount = CatchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await AuthService.confirmedAccount(payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP verified successfully",
      data: user,
    });
});

// Login user
const loginUser = CatchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await AuthService.loginUser(payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully",
      data: user,
    });
});

export const AuthController = {
    confirmedAccount,
    loginUser,
};
