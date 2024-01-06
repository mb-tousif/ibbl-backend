import express from "express";
import Authenticate from "../../middleware/authenticate";
import { ENUM_USER_ROLE } from "../../../constant/userRole";
import { BankSummaryController } from "./BankSummary.controller";
import ValidateRequest from "../../middleware/validateZodRequest";
import { BankSummaryValidation } from "./BankSummary.zod.validation";

const router = express.Router();

router.get(
  "/current-summary",
  Authenticate(
    ENUM_USER_ROLE.CEO,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.ADMIN
  ),
  BankSummaryController.getCurrentBankSummary
);

router.post(
  "/capital-transactions",
  // Authenticate(ENUM_USER_ROLE.CEO),
  ValidateRequest(BankSummaryValidation.dataValidation),
  BankSummaryController.createBank
);

router.patch(
  "/update-statement",
  Authenticate(ENUM_USER_ROLE.CEO),
  ValidateRequest(BankSummaryValidation.dataValidation),
  BankSummaryController.updateBankStatement
);

export const BankSummaryRoutes = router;
