import Booking from "../models/booking.model";

/**
 * Create booking
 */
export const createBooking = async (
  customerId: string,
  businessId: string,
  data: {
    requestedDate: string;
    message?: string;
  }
) => {
  if (!customerId || !businessId) {
    throw new Error("Customer or Business missing");
  }

  if (!data.requestedDate) {
    throw new Error("Requested date is required");
  }

  return Booking.create({
    customer: customerId,
    business: businessId,
    requestedDate: data.requestedDate,
    message: data.message
  });
};

/**
 * Customer bookings
 */
export const getMyBookings = async (customerId: string) => {
  return Booking.find({ customer: customerId })
    .populate("business", "name category")
    .sort({ createdAt: -1 });
};

/**
 * Business bookings
 */
export const getBusinessBookings = async (businessId: string) => {
  return Booking.find({ business: businessId })
    .populate("customer", "name email")
    .sort({ createdAt: -1 });
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (
  bookingId: string,
  status: "accepted" | "rejected" | "completed"
) => {
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  );

  if (!booking) throw new Error("Booking not found");
  return booking;
};
