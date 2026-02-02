import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useAuthStore } from "../../store/auth.store";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = () => {
  const navigate = useNavigate();
  const logoutStore = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logoutStore();
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="w-64 bg-[#0b1220] text-white flex flex-col justify-between p-6">
      {/* Top */}
      <div>
        <h2 className="text-xl font-bold mb-8">Dashboard</h2>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 w-full text-left mb-4 hover:text-indigo-400"
        >
          <DashboardIcon />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/bookings")}
          className="flex items-center gap-2 w-full text-left mb-4 hover:text-indigo-400"
        >
          <BookOnlineIcon />
          My Bookings
        </button>

        <button
          onClick={() => navigate("/my-businesses")}
          className="flex items-center gap-2 w-full text-left mb-4 hover:text-indigo-400"
        >
          <StoreIcon />
          My Businesses
        </button>

        <button
          onClick={() => navigate("/create-business")}
          className="flex items-center gap-2 w-full text-left hover:text-indigo-400"
        >
          <AddBusinessIcon />
          Create Business
        </button>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <PersonIcon />
          <span>My Profile</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-500"
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
