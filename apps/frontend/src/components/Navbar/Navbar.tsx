import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0b1220] text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4.706" cy="16" r="4.706" fill="#fff" />
          <circle cx="16.001" cy="4.706" r="4.706" fill="#fff" />
          <circle cx="16.001" cy="27.294" r="4.706" fill="#fff" />
          <circle cx="27.294" cy="16" r="4.706" fill="#fff" />
        </svg>
        <span className="text-xl font-bold">LocalService</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-base font-semibold">
        <Link to="/" className="hover:text-indigo-400 transition">
          Home
        </Link>
        <Link to="/services" className="hover:text-indigo-400 transition">
          Services
        </Link>
        <Link to="/contact" className="hover:text-indigo-400 transition">
          Contact
        </Link>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4 text-base font-semibold">
        <Link
          to="/login"
          className="border border-slate-600 px-5 py-2 rounded-md hover:bg-slate-800 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 px-5 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-16 left-0 w-full bg-[#0b1220]
                       flex flex-col items-center gap-6 py-8
                       text-lg font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="bg-indigo-600 px-6 py-2 rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
