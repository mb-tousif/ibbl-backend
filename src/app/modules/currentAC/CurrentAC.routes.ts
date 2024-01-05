
import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import { CurrentACValidation } from "./Saving_AC.zod.validation";
import { CurrentACController } from "./Saving_AC.controller";
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
  CurrentACController.getAllCurrentAC
);

router.get(
  "/get-saving-ac/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  CurrentACController.getCurrentACById
);

router.post(
  "/create-saving-ac",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  ValidateRequest(CurrentACValidation.postValidation),
  CurrentACController.createCurrentAC
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
  ValidateRequest(CurrentACValidation.updateValidation),
  CurrentACController.updateCurrentACById
);

export const CurrentACRoutes = router;
