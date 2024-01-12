import express from "express";
import ValidateRequest from "../../middleware/validateZodRequest";
import { SubscriberValidation } from "./Subscriber.zod.validation";
import { SubscriberController } from "./Subscriber.controller";
import Authenticate from "../../middleware/authenticate";
import { ENUM_USER_ROLE } from "../../../constant/userRole";

const router = express.Router();

router.post(
  "/create-subscriber",
  ValidateRequest(SubscriberValidation.postValidation),
  SubscriberController.createSubscriber
);

router.get(
  "/all-subscribers",
  Authenticate(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.CEO
  ),
  SubscriberController.getAllSubscriber
);

router.delete(
  "/delete-subscriber/:id",
  Authenticate(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MANAGER,
    ENUM_USER_ROLE.CASHIER,
    ENUM_USER_ROLE.CEO
  ),
  SubscriberController.deleteSubscriber
);
export const SubscriberRoutes = router;
