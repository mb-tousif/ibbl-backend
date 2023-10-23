
import express from 'express';
import ValidateRequest from '../../middleware/validateZodRequest';
import { DepositsValidation } from './Deposits.zod.validation';
import { DepositsController } from './Deposits.controller';

const router = express.Router();

router.post("/create-deposit", 
    ValidateRequest( DepositsValidation.postValidation ),
    DepositsController.createDeposit
);

export const DepositsRoutes = router;
