
import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import Authenticate from "../../middleware/authenticate";
import { ENUM_USER_ROLE } from "../../../constant/userRole";
import { CurrentACController } from "./CurrentAC.controller";
import { CurrentACValidation } from "./CurrentAC.zod.validation";

const router = express.Router();

router.get(
  "/get-all-currents-ac",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  CurrentACController.getAllCurrentAC
);

router.get(
  "/get-current-ac/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  CurrentACController.getCurrentACById
);

router.get(
  "/my-account",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.ACCOUNT_HOLDER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  CurrentACController.getMyAC
);

router.post(
  "/create-current-ac",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  ValidateRequest(CurrentACValidation.postValidation),
  CurrentACController.createCurrentAC
);

router.patch(
  "/update-current-ac/:id",
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
