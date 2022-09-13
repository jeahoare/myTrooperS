import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      jwt_decode(token);
      return <Outlet />;
    } catch (_) {
      localStorage.removeItem("token");
    }
  }
  return <Navigate to="/login" replace />;
};