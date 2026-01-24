import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useAuthStore } from "../../store/auth.store";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const navigate = useNavigate();
  const logoutStore = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // backend clears cookie
      logoutStore();
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="w-64 bg-[#0b1220] text-white flex flex-col justify-between p-6">
      <div>
        <h2 className="text-xl font-bold mb-8">Dashboard</h2>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-left mb-4 hover:text-indigo-400"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/bookings")}
          className="w-full text-left hover:text-indigo-400"
        >
          My Bookings
        </button>
      </div>

      {/* Profile + Logout */}
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
