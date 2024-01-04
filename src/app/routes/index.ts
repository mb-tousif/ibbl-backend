import express from "express";
import { UserRoutes } from "../modules/user/User.routes";
import { AuthRoutes } from "../modules/auth/Auth.routes";
import { SavingACRoutes } from "../modules/Saving_AC/Saving_AC.routes";
import { BankSummaryRoutes } from "../modules/bankSummary/BankSummary.routes";

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
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
