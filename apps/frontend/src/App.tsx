import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Providers from "./pages/Providers";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import VerifyEmail from "./pages/VerifyEmail";
import CheckEmail from "./pages/CheckEmail";
import Businesses from "./pages/Businesses";
import CreateBusiness from "./pages/CreateBusiness";
import MyBusinesses from "./pages/MyBusinesses";

import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/email-verified" element={<VerifyEmail />} />

      {/* ---------- Public Browsing ---------- */}
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<Providers />} />
      <Route path="/businesses" element={<Businesses />} />

      {/* ---------- Protected Routes ---------- */}
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-businesses"
          element={
            <ProtectedRoute>
              <MyBusinesses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-business"
          element={
            <ProtectedRoute>
              <CreateBusiness />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
