import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import { SavingACValidation } from "./Saving_AC.zod.validation";
import { SavingACController } from "./Saving_AC.controller";
import Authenticate from "../../middleware/authenticate";
import { ENUM_USER_ROLE } from "../../../constant/userRole";

const router = express.Router();

router.post(
  "/create-savings-account",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  ValidateRequest(SavingACValidation.postValidation),
  SavingACController.createSavingAC
);



export const SavingACRoutes = router;
