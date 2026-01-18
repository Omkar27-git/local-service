import { Router } from "express";
import {
  createPaymentOrderHandler,
  verifyPaymentHandler
} from "../controllers/payment.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/create-order",
  protect,
  createPaymentOrderHandler
);

router.post(
  "/verify",
  protect,
  verifyPaymentHandler
);

export default router;
