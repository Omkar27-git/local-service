import {
  Box,
  List,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/" },
    { label: "Businesses", path: "/businesses" },
    { label: "Bookings", path: "/bookings" }
  ];

  return (
    <Box
      width={260}
      minHeight="100vh"
      bgcolor="#0f172a"
      color="white"
      px={2}
      py={3}
    >
      <Box
        fontSize={22}
        fontWeight={700}
        mb={4}
        letterSpacing={0.5}
      >
        LocalService
      </Box>

      <List>
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: active ? "#1e293b" : "transparent",
                "&:hover": {
                  bgcolor: "#1e293b"
                }
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: active ? 600 : 400
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
