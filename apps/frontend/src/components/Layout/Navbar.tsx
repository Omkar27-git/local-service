import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #e5e7eb"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          fontSize={16}
          fontWeight={600}
          color="#111827"
        >
          Dashboard
        </Typography>

        <Box>
          <Button
            onClick={handleLogout}
            variant="outlined"
            size="small"
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
