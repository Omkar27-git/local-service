import { Box, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

const StatCard = ({
  title,
  value,
  icon
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: 3,
      display: "flex",
      alignItems: "center",
      gap: 2,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    }}
  >
    <Box
      sx={{
        bgcolor: "#e0e7ff",
        p: 1.5,
        borderRadius: 2
      }}
    >
      {icon}
    </Box>

    <Box>
      <Typography
        fontSize={13}
        color="text.secondary"
      >
        {title}
      </Typography>

      <Typography
        fontSize={22}
        fontWeight={700}
      >
        {value}
      </Typography>
    </Box>
  </Paper>
);

const Dashboard = () => {
  return (
    <>
      <Typography
        fontSize={22}
        fontWeight={700}
        mb={3}
      >
        Overview
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          md: "repeat(3, 1fr)"
        }}
        gap={3}
      >
        <StatCard
          title="Total Customers"
          value="120"
          icon={<PeopleIcon />}
        />

        <StatCard
          title="Businesses"
          value="8"
          icon={<StoreIcon />}
        />

        <StatCard
          title="Bookings"
          value="32"
          icon={<BookOnlineIcon />}
        />
      </Box>
    </>
  );
};

export default Dashboard;
