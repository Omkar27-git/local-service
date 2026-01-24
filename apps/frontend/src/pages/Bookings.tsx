import { useEffect, useState } from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { getMyBookingsApi } from "../api/booking.api";

const Bookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    getMyBookingsApi().then(setBookings);
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "completed") return "success";
    if (status === "pending") return "warning";
    return "default";
  };

  return (
    <>
      <Typography fontSize={22} fontWeight={700} mb={3}>
        My Bookings
      </Typography>

      <Box display="grid" gap={2}>
        {bookings.map((b) => (
          <Paper key={b._id} sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={600}>
              {b.business?.name}
            </Typography>

            <Chip
              label={b.status}
              color={getStatusColor(b.status) as any}
            />
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default Bookings;
