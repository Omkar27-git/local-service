import {  Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Businesses from "./pages/Businesses";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Layout from "./components/Layout/Layout";
import Services from "./pages/Services";
import Providers from "./pages/Providers";
import OAuthSuccess from "./pages/OauthSucess";

function App() {
  return (
    
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId/providers" element={<Providers />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
          
              <Layout>
                <Dashboard />
              </Layout>
       
          }
        />

        <Route
          path="/businesses"
          element={
    
              <Layout>
                <Businesses />
              </Layout>
         
          }
        />

        <Route
          path="/booking/:providerId"
          element={
            
              <Layout>
                <Booking />
              </Layout>
         
          }
        />

        <Route
          path="/bookings"
          element={
         
              <Layout>
                <Bookings />
              </Layout>

          }
        />
      </Routes>
    
  );
}

export default App;
