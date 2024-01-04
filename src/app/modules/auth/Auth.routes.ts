import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import { AuthValidation } from "./Auth.zod.validation";
import { AuthController } from "./Auth.controller";
import { checkLoginAttempts } from "../../middleware/checkLoginAttempts";

const router = express.Router();

router.post(
  "/verify-otp",
  ValidateRequest(AuthValidation.otpValidation),
  AuthController.confirmedAccount
);

router.post(
  "/login",
  checkLoginAttempts,
  ValidateRequest(AuthValidation.loginValidation),
  AuthController.loginUser
);

router.post(
  "/forgot-password",
  ValidateRequest(AuthValidation.forgetPasswordValidation),
  AuthController.forgetPasswordRequest
);

router.post(
  "/reset-password",
  ValidateRequest(AuthValidation.resetPasswordValidation),
  AuthController.resetPassword
);

export const AuthRoutes = router;
