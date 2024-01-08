import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import { SavingACValidation } from "./Saving_AC.zod.validation";
import { SavingACController } from "./Saving_AC.controller";
import Authenticate from "../../middleware/authenticate";
import { ENUM_USER_ROLE } from "../../../constant/userRole";

const router = express.Router();

router.get(
  "/get-all-savings-ac",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  SavingACController.getAllSavingAC
);

router.get(
  "/get-saving-ac/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  SavingACController.getSavingACById
);

router.post(
  "/create-saving-ac",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  ValidateRequest(SavingACValidation.postValidation),
  SavingACController.createSavingAC
);

router.patch(
  "/update-saving-ac/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.ACCOUNT_HOLDER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  ValidateRequest(SavingACValidation.updateValidation),
  SavingACController.updateSavingACById
);

export const SavingACRoutes = router;