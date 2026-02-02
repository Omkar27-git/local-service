import { Navigate } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import api from "../api/axios";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<"loading" | "auth" | "guest">("loading");

  useEffect(() => {
    api
      .get("/auth/me")
      .then(() => setStatus("auth"))
      .catch(() => setStatus("guest"));
  }, []);

  if (status === "loading") return null;

  if (status === "guest") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
