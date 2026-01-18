import api from "axios"

export const getMyBookings = async()=>{
    const res = await api.get("/bookings/me");
    return res.data;
}