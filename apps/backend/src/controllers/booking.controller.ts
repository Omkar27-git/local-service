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
 * Create booking (Customer)
 */
export const createBookingHandler = async (
  req: Request,
  res: Response
) => {
  const customerId = (req as any).userId;
  const businessId = req.params.businessId;

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const business = await Business.findById(businessId).populate(
    "owner",
    "email name"
  );

  if (!business) {
    return res.status(404).json({ message: "Business not found" });
  }

  const booking = await createBooking(customerId, businessId, req.body);

  const providerEmail = (business as any)?.owner?.email;

  if (providerEmail) {
    await sendEmail({
      to: providerEmail,
      subject: "New Booking Request",
      html: `<p>You have received a new booking request.</p>`
    });
  }

  res.status(201).json({
    message: "Booking created successfully",
    booking
  });
};

/**
 * Provider: view bookings for a business
 */
export const getBusinessBookingsHandler = async (
  req: Request,
  res: Response
) => {
  const businessId = req.params.businessId;
  const userId = (req as any).userId;

  const business = await Business.findById(businessId);

  if (!business || business.owner.toString() !== userId) {
    return res.status(403).json({ message: "Access denied" });
  }

  const bookings = await getBusinessBookings(businessId);
  res.json(bookings);
};

/**
 * Customer: view my bookings
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
 * Provider: accept booking
 */
export const acceptBookingHandler = async (
  req: Request,
  res: Response
) => {
  const bookingId = req.params.bookingId;
  const booking = await updateBookingStatus(bookingId, "accepted");
  res.json({ message: "Booking accepted", booking });
};

/**
 * Provider: reject booking
 */
export const rejectBookingHandler = async (
  req: Request,
  res: Response
) => {
  const bookingId = req.params.bookingId;
  const booking = await updateBookingStatus(bookingId, "rejected");
  res.json({ message: "Booking rejected", booking });
};

/**
 * Provider: complete booking
 */
export const completeBookingHandler = async (
  req: Request,
  res: Response
) => {
  const bookingId = req.params.bookingId;
  const booking = await updateBookingStatus(bookingId, "completed");
  res.json({ message: "Booking completed", booking });
};
