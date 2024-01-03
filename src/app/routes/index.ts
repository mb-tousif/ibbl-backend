import express from "express";
import { UserRoutes } from "../modules/user/User.routes";
import { AuthRoutes } from "../modules/auth/Auth.routes";
import { AccountTypeRoutes } from "../modules/accountType/AccountType.routes";
import { SavingACRoutes } from "../modules/Saving_AC/Saving_AC.routes";

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
    path: "/saving-ac",
    route: SavingACRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
