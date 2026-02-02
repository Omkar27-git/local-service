import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64
          transform bg-[#0b1220]
          transition-transform duration-300
          md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top bar (mobile only) */}
        <div className="md:hidden bg-white px-4 py-3 shadow flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)}>
            <MenuIcon />
          </button>
          <h1 className="font-semibold text-lg">Dashboard</h1>
        </div>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
