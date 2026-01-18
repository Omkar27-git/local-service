import Booking from "../models/booking.model";

/**
 * Create a booking request
 */
export const createBooking = async (
  customerId: string,
  businessId: string,
  data: any
) => {
  try {
    // Basic validation
    if (!customerId || !businessId) {
      throw new Error("Customer ID or Business ID missing");
    }

    if (!data.requestedDate) {
      throw new Error("Requested date is required");
    }

    const booking = await Booking.create({
      customer: customerId,
      business: businessId,
      requestedDate: data.requestedDate,
      message: data.message
    });

    return booking;
  } catch (error: any) {
    console.error("Error creating booking:", error.message);
    throw new Error(error.message || "Failed to create booking");
  }
};

/**
 * Get bookings for a business (provider view)
 */
export const getBusinessBookings = async (businessId: string) => {
  try {
    if (!businessId) {
      throw new Error("Business ID is required");
    }

    const bookings = await Booking.find({ business: businessId })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    return bookings;
  } catch (error: any) {
    console.error("Error fetching business bookings:", error.message);
    throw new Error("Failed to fetch business bookings");
  }
};

/**
 * Get bookings created by customer
 */
export const getMyBookings = async (customerId: string) => {
  try {
    if (!customerId) {
      throw new Error("Customer ID is required");
    }

    const bookings = await Booking.find({ customer: customerId })
      .populate("business", "name category")
      .sort({ createdAt: -1 });

    return bookings;
  } catch (error: any) {
    console.error("Error fetching customer bookings:", error.message);
    throw new Error("Failed to fetch bookings");
  }
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (
  bookingId: string,
  status: "accepted" | "rejected" | "completed"
) => {
  try {
    if (!bookingId) {
      throw new Error("Booking ID is required");
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error: any) {
    console.error("Error updating booking status:", error.message);
    throw new Error("Failed to update booking status");
  }
};
