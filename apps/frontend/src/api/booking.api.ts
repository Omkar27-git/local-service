import api from "./axios";

export const createBookingApi = async (
  businessId: string,
  data: {
    requestedDate: string;
    message?: string;
  }
) => {
  const res = await api.post(`/bookings/${businessId}`, data);
  return res.data;
};

export const getMyBookingsApi = async () => {
  const res = await api.get("/bookings/me");
  return res.data;
};
