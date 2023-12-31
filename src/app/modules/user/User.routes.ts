import express from 'express';
import { UserController } from './User.controller';
import ValidateRequest from '../../middleware/validateZodRequest';
import { UserValidation } from './User.zod.validation';
import Authenticate from '../../middleware/authenticate';
import { ENUM_USER_ROLE } from '../../../constant/userRole';

const router = express.Router();

router.get( "/all-users", 
    // Authenticate(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.MANAGER, ENUM_USER_ROLE.CEO), 
    UserController.getAllUsers
)

router.post( "/create-user",
    ValidateRequest(UserValidation.postValidation), 
    UserController.createUser
)

router.post( "/create-mgt",
    ValidateRequest(UserValidation.managementPostValidation),
    Authenticate(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.MANAGER, ENUM_USER_ROLE.CEO),
    UserController.createManagement
)

router.patch( "/update-user/:id",
    // Authenticate(ENUM_USER_ROLE.USER),
    UserController.updateUserById
)

export const UserRoutes = router;
