import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthStore } from "../../store/auth.store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuth, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-[#0b1220] text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl font-bold">LocalService</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 font-semibold">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-4 relative">
        {!isAuth ? (
          <Link
            to="/login"
            className="border border-slate-600 px-5 py-2 rounded-md hover:bg-slate-800"
          >
            Login
          </Link>
        ) : (
          <>
            {/* Profile Icon */}
            <button onClick={() => setProfileOpen(!profileOpen)}>
              <AccountCircleIcon fontSize="large" />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-12 bg-white text-black rounded shadow w-32">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 md:hidden">
          <div className="absolute top-16 left-0 w-full bg-[#0b1220] flex flex-col items-center gap-6 py-8">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

            {!isAuth ? (
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
