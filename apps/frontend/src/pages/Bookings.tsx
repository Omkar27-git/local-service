import { useEffect, useState } from "react";
import { Box, Typography, Paper, Chip, CircularProgress } from "@mui/material";
import axios from "axios";
import { useAuthStore } from "../store/auth.store";
import { toast } from "react-toastify";

const Bookings = () => {
  const token = useAuthStore((state) => state.token);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status: string) => {
    if (status === "completed") return "success";
    if (status === "pending") return "warning";
    if (status === "accepted") return "info";
    if (status === "rejected") return "error";
    return "default";
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setBookings(res.data);
      } catch (error: any) {
        console.error("Fetch bookings error:", error);
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchBookings();
  }, [token]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography fontSize={22} fontWeight={700} mb={3}>
        My Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Typography color="textSecondary">
          No bookings found. Book your first service!
        </Typography>
      ) : (
        <Box display="grid" gap={2}>
          {bookings.map((b) => (
            <Paper
              key={b._id}
              sx={{
                p: 3,
                borderRadius: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <Typography fontWeight={600}>
                {b.business?.name || "Service"} —{" "}
                {new Date(b.requestedDate).toLocaleDateString()}
              </Typography>

              <Chip
                label={b.status}
                color={getStatusColor(b.status) as any}
                sx={{ textTransform: "capitalize" }}
              />
            </Paper>
          ))}
        </Box>
      )}
    </>
  );
};

export default Bookings;
