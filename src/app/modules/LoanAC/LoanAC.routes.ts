import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import Authenticate from "../../middleware/authenticate";
import { ENUM_USER_ROLE } from "../../../constant/userRole";
import { LoanACController } from "./LoanAC.controller";
import { LoanACValidation } from "./LoanAC.zod.validation";

const router = express.Router();

router.get(
  "/get-all-loans-ac",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  LoanACController.getAllLoanAC
);

router.get(
  "/get-loan-ac/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  LoanACController.getLoanACById
);

router.get(
  "/my-account",
  Authenticate(
    ENUM_USER_ROLE.ACCOUNT_HOLDER,
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  LoanACController.getMyAC
);

router.post(
  "/create-loan-ac",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  ValidateRequest(LoanACValidation.postValidation),
  LoanACController.createLoanAC
);

router.patch(
  "/update-loan-ac/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.ACCOUNT_HOLDER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  ValidateRequest(LoanACValidation.updateValidation),
  LoanACController.updateLoanACById
);

router.patch(
  "/give-loan/:id",
  Authenticate(
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.ACCOUNT_HOLDER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.ADMIN
  ),
  ValidateRequest(LoanACValidation.instalmentValidation),
  LoanACController.giveLoan
);

export const LoanACRoutes = router;
