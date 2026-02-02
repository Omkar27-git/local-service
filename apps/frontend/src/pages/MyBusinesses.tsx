import { useEffect, useState } from "react";
import api from "../api/axios";
import { Typography, Paper, Box } from "@mui/material";

type Business = {
  _id: string;
  name: string;
  category: string;
  description: string;
};

const MyBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    api
      .get("/business/me")
      .then((res) => setBusinesses(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <Typography fontSize={22} fontWeight={700} mb={3}>
        My Businesses
      </Typography>

      <Box display="grid" gap={2}>
        {businesses.length === 0 && (
          <Typography color="text.secondary">
            You have not created any businesses yet.
          </Typography>
        )}

        {businesses.map((b) => (
          <Paper key={b._id} sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={600}>{b.name}</Typography>
            <Typography fontSize={14} color="text.secondary">
              {b.category}
            </Typography>
            <Typography fontSize={14} mt={1}>
              {b.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default MyBusinesses;
