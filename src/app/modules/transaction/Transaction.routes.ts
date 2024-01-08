import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import { TransactionValidation } from "./Transaction.zod.validation";
import { TransactionController } from "./Transaction.controller";
import Authenticate from "../../middleware/authenticate";
import { ENUM_USER_ROLE } from "../../../constant/userRole";

const router = express.Router();

router.get(
  "/get-all-transactions",
  Authenticate(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO
  ),
  TransactionController.getAllTransaction
);

router.get(
  "/get-transaction/:id",
  Authenticate(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CEO
  ),
  TransactionController.getTransactionById
);

router.get(
  "/my-transactions",
  Authenticate(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.ACCOUNT_HOLDER,
    ENUM_USER_ROLE.CEO
  ),
  TransactionController.myTransaction
);

router.post(
  "/save-transaction",
  Authenticate(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.ACCOUNT_HOLDER,
    ENUM_USER_ROLE.CEO
  ),
  ValidateRequest(TransactionValidation.postValidation),
  TransactionController.saveTransaction
);

export const TransactionRoutes = router;
