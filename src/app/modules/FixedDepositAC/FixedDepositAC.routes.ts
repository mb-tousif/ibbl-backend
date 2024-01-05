
import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import { FixedDepositACValidation } from "./Saving_AC.zod.validation";
import { FixedDepositACController } from "./Saving_AC.controller";
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
  FixedDepositACController.getAllFixedDepositAC
);

router.get(
  "/get-saving-ac/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  FixedDepositACController.getFixedDepositACById
);

router.post(
  "/create-saving-ac",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  ValidateRequest(FixedDepositACValidation.postValidation),
  FixedDepositACController.createFixedDepositAC
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
  ValidateRequest(FixedDepositACValidation.updateValidation),
  FixedDepositACController.updateFixedDepositACById
);

export const FixedDepositACRoutes = router;
