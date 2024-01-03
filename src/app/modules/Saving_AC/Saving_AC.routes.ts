
import express from 'express';
import ValidateRequest from '../../middleware/validateZodRequest';
import { SavingACValidation } from './Saving_AC.zod.validation';
import { SavingACController } from './Saving_AC.controller';

const router = express.Router();

router.post("/create-savings-account", 
    ValidateRequest( SavingACValidation.postValidation ),
    SavingACController.createSavingAC
);

export const SavingACRoutes = router;
