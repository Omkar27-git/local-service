import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex">
      <Sidebar />

      <Box flex={1}>
        <Navbar />

        <Box p={3} bgcolor="#f9fafb" minHeight="calc(100vh - 64px)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
