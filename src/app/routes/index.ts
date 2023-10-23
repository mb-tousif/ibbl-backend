import express from "express";
import { UserRoutes } from "../modules/user/User.routes";
import { AuthRoutes } from "../modules/auth/Auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
