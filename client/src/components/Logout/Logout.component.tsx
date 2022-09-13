import { AiOutlineLogout } from 'react-icons/ai';

import "./style.scss";

type PropsType = {
  logout: () => void,
};

export const Logout = ({ logout }: PropsType) => {
  return (
    <div onClick={logout} className="logout">
      <span>Logout</span>
      <AiOutlineLogout />
    </div>
  );
};