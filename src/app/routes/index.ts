import express from "express";
import { UserRoutes } from "../modules/user/User.routes";
import { AuthRoutes } from "../modules/auth/Auth.routes";
import { SavingACRoutes } from "../modules/Saving_AC/Saving_AC.routes";
import { BankSummaryRoutes } from "../modules/bankSummary/BankSummary.routes";
import { StaffACRoutes } from "../modules/StaffAC/StaffAC.routes";
import { LoanACRoutes } from "../modules/LoanAC/LoanAC.routes";
import { CurrentACRoutes } from "../modules/currentAC/CurrentAC.routes";
import { TransactionRoutes } from "../modules/transaction/Transaction.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/bank-main",
    route: BankSummaryRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/saving-ac",
    route: SavingACRoutes,
  },
  {
    path: "/staff-ac",
    route: StaffACRoutes,
  },
  {
    path: "/loan-ac",
    route: LoanACRoutes,
  },
  {
    path: "/current-ac",
    route: CurrentACRoutes,
  },
  {
    path: "/transactions",
    route: TransactionRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
