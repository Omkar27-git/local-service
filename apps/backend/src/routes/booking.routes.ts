import { Router } from "express";
import {
  createBookingHandler,
  getBusinessBookingsHandler,
  getMyBookingsHandler,
  acceptBookingHandler,
  rejectBookingHandler,
  completeBookingHandler
} from "../controllers/booking.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Customer creates booking
 */
router.post("/:businessId", protect, createBookingHandler);

/**
 * Customer views own bookings
 */
router.get("/me", protect, getMyBookingsHandler);

/**
 * Provider views bookings for a business
 */
router.get(
  "/business/:businessId",
  protect,
  getBusinessBookingsHandler
);

/**
 * Provider booking actions
 */
router.patch("/:bookingId/accept", protect, acceptBookingHandler);
router.patch("/:bookingId/reject", protect, rejectBookingHandler);
router.patch("/:bookingId/complete", protect, completeBookingHandler);

export default router;
