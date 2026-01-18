import { Router } from "express";
import {
  createBookingHandler,
  getBusinessBookingsHandler,
  getMyBookingsHandler
} from "../controllers/booking.controller";

import {
  acceptBookingHandler,
  rejectBookingHandler,
  completeBookingHandler
} from "../controllers/booking.controller";

import { protect } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Customer creates a booking for a business
 */
router.post(
  "/:businessId",
  protect,
  createBookingHandler
);

/**
 * Provider views bookings for a business
 */
router.get(
  "/business/:businessId",
  protect,
  getBusinessBookingsHandler
);

/**
 * Customer views their bookings
 */
router.get(
  "/me",
  protect,
  getMyBookingsHandler
);


/**
 * Accept a booking
 */
router.patch(
  "/:bookingId/accept",
  protect,
  acceptBookingHandler
);

/**
 * Reject a booking
 */
router.patch(
  "/:bookingId/reject",
  protect,
  rejectBookingHandler
);

/**
 * Complete a booking
 */
router.patch(
  "/:bookingId/complete",
  protect,
  rejectBookingHandler
);



export default router;
