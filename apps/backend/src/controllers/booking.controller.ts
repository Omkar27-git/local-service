import { Request, Response } from "express";
import {
  createBooking,
  getBusinessBookings,
  getMyBookings,
  updateBookingStatus
} from "../services/booking.service";
import Business from "../models/business.model";
import { sendEmail } from "../utils/sendEmail";

/**
 * Create booking
 */
export const createBookingHandler = async (
  req: Request,
  res: Response
) => {
  const customerId = (req as any).userId;
  const businessId = req.params.businessId as string;

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const booking = await createBooking(customerId, businessId, req.body);

  const business = await Business.findById(businessId)
    .populate("owner", "email name");

  const providerEmail = (business as any)?.owner?.email;

  if (providerEmail) {
    await sendEmail({
      to: providerEmail,
      subject: "New Booking Request",
      html: `<p>New booking request received</p>`
    });
  }

  res.status(201).json({
    message: "Booking created successfully",
    booking
  });
};

/**
 * Provider bookings
 */
export const getBusinessBookingsHandler = async (
  req: Request,
  res: Response
) => {
  const businessId = req.params.businessId as string;
  const bookings = await getBusinessBookings(businessId);
  res.json(bookings);
};

/**
 * Customer bookings
 */
export const getMyBookingsHandler = async (
  req: Request,
  res: Response
) => {
  const customerId = (req as any).userId;
  const bookings = await getMyBookings(customerId);
  res.json(bookings);
};

/**
 * Accept booking
 */
export const acceptBookingHandler = async (
  req: Request,
  res: Response
) => {
  const bookingId = req.params.bookingId as string;
  const booking = await updateBookingStatus(bookingId, "accepted");
  res.json({ message: "Booking accepted", booking });
};

/**
 * Reject booking
 */
export const rejectBookingHandler = async (
  req: Request,
  res: Response
) => {
  const bookingId = req.params.bookingId as string;
  const booking = await updateBookingStatus(bookingId, "rejected");
  res.json({ message: "Booking rejected", booking });
};

/**
 * Complete booking
 */
export const completeBookingHandler = async (
  req: Request,
  res: Response
) => {
  const bookingId = req.params.bookingId as string;
  const booking = await updateBookingStatus(bookingId, "completed");
  res.json({ message: "Booking completed", booking });
};
