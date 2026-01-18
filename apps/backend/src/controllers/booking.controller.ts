 import { Request, Response } from "express";
import {
  createBooking,
  getBusinessBookings,
  getMyBookings,
  updateBookingStatus
} from "../services/booking.service";
import { sendEmail } from "../utils/sendEmail";
import Business from "../models/business.model";

/**
 * Customer creates a booking
 */
export const createBookingHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const customerId = (req as any).userId;
    const businessId = req.params.businessId;

    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const booking = await createBooking(
      customerId,
      businessId,
      req.body
    );

    // Fetch business owner email
    const business = await Business.findById(businessId)
      .populate("owner", "email name");

    const providerEmail = (business as any)?.owner?.email;

    if (providerEmail) {
      await sendEmail({
        to: providerEmail,
        subject: "New Booking Request",
        html: `
          <h3>New Booking Received</h3>
          <p>You have received a new booking request.</p>
          <p><b>Date:</b> ${new Date(
            booking.requestedDate
          ).toLocaleDateString()}</p>
        `
      });
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });
  } catch (error: any) {
    console.error("Create booking error:", error.message);
    res.status(400).json({
      message: error.message || "Failed to create booking"
    });
  }
};

/**
 * Provider views bookings for their business
 */
export const getBusinessBookingsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const businessId = req.params.businessId;

    const bookings = await getBusinessBookings(businessId);

    res.json(bookings);
  } catch (error: any) {
    console.error("Get business bookings error:", error.message);
    res.status(400).json({
      message: "Failed to fetch business bookings"
    });
  }
};

/**
 * Customer views their own bookings
 */
export const getMyBookingsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const customerId = (req as any).userId;

    const bookings = await getMyBookings(customerId);

    res.json(bookings);
  } catch (error: any) {
    console.error("Get my bookings error:", error.message);
    res.status(400).json({
      message: "Failed to fetch bookings"
    });
  }
};

/**
 * Accept booking
 */
export const acceptBookingHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await updateBookingStatus(
      bookingId,
      "accepted"
    );

    res.json({
      message: "Booking accepted",
      booking
    });
  } catch (error: any) {
    console.error("Accept booking error:", error.message);
    res.status(400).json({
      message: error.message || "Failed to accept booking"
    });
  }
};

/**
 * Reject booking
 */
export const rejectBookingHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await updateBookingStatus(
      bookingId,
      "rejected"
    );

    res.json({
      message: "Booking rejected",
      booking
    });
  } catch (error: any) {
    console.error("Reject booking error:", error.message);
    res.status(400).json({
      message: error.message || "Failed to reject booking"
    });
  }
};

/**
 * Complete booking
 */
export const completeBookingHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await updateBookingStatus(
      bookingId,
      "completed"
    );

    res.json({
      message: "Booking completed",
      booking
    });
  } catch (error: any) {
    console.error("Complete booking error:", error.message);
    res.status(400).json({
      message: error.message || "Failed to complete booking"
    });
  }
};
