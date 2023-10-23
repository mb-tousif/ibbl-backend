import express from 'express';
import ValidateRequest from '../../middleware/validateZodRequest';
import { AuthValidation } from './Auth.zod.validation';
import { AuthController } from './Auth.controller';

const router = express.Router();

router.post( "/verify-otp", 
    ValidateRequest(AuthValidation.otpValidation),
    AuthController.confirmedAccount
)

router.post("/login", 
    ValidateRequest(AuthValidation.postValidation),
    AuthController.loginUser
)

export const AuthRoutes = router;
