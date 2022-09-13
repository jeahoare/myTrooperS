import { useNavigate } from "react-router-dom";

import { Logout } from "./Logout.component";

export const LogoutContainer = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  }

  return <Logout logout={logout} />;
};