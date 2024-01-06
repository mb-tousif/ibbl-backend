
import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import Authenticate from "../../middleware/authenticate";
import { ENUM_USER_ROLE } from "../../../constant/userRole";
import { StaffACController } from "./StaffAC.controller";
import { StaffACValidation } from "./StaffAC.zod.validation";

const router = express.Router();

router.get(
  "/get-all-staff-ac",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  StaffACController.getAllStaffAC
);

router.get(
  "/get-staff-ac/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  StaffACController.getStaffACById
);

router.post(
  "/create-staff-ac",
  // Authenticate(
  //   ENUM_USER_ROLE.CASHIER,
  //   ENUM_USER_ROLE.MANAGER,
  //   ENUM_USER_ROLE.CEO,
  //   ENUM_USER_ROLE.ADMIN
  // ),
  ValidateRequest(StaffACValidation.postValidation),
  StaffACController.createStaffAC
);

router.patch(
  "/update-staff-ac/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.ACCOUNT_HOLDER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  ValidateRequest(StaffACValidation.updateValidation),
  StaffACController.updateStaffACById
);

export const StaffACRoutes = router;
