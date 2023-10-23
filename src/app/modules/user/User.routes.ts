import express from 'express';
import { UserController } from './User.controller';
import ValidateRequest from '../../middleware/validateZodRequest';
import { UserValidation } from './User.zod.validation';

const router = express.Router();

router.post( "/create-user",
    ValidateRequest(UserValidation.postValidation), 
    UserController.createUser
)

export const UserRoutes = router;
