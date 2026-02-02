import { Router } from "express";
import {
  getBusinessesHandler,
  createBusinessHandler,
  getMyBusinessesHandler,
  approveBusinessHandler
} from "../controllers/business.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

/**
 * PUBLIC
 */
router.get("/", getBusinessesHandler);

/**
 * PROVIDER (logged-in user)
 */
router.post("/", protect, createBusinessHandler);
router.get("/me", protect, getMyBusinessesHandler);

/**
 * ADMIN (later)
 */
router.put("/:id/approve", protect, approveBusinessHandler);

export default router;
