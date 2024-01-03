import express from "express";
import { UserRoutes } from "../modules/user/User.routes";
import { AuthRoutes } from "../modules/auth/Auth.routes";
import { DepositsRoutes } from "../modules/Saving_AC/Saving_AC.routes";
import { AccountTypeRoutes } from "../modules/accountType/AccountType.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/accounts",
    route: AccountTypeRoutes,
  },
  {
    path: "/deposits",
    route: DepositsRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
