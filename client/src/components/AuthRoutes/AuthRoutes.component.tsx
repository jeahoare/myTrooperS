import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthRoutes = () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      jwt_decode(token);
      return <Navigate to="/" replace />;
    } catch (_) {
      localStorage.removeItem('token');
    }
  }
  return <Outlet />;
};