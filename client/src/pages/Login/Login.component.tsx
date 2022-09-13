import { Link } from "react-router-dom";

import { Authentification } from "../../components";

type PropsType = {
  email: string;
  handleChangeEmail: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  password: string;
  handleChangePwd: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
  loading: boolean;
  title: "Loading ..." | "Login";
};

export const Login = ({
  email,
  handleChangeEmail,
  password,
  handleChangePwd,
  handleSubmit,
  loading,
  title
}: PropsType) => {
  return (
    <>
      <Authentification
        email={email}
        handleChangeEmail={handleChangeEmail}
        password={password}
        handleChangePwd={handleChangePwd}
        handleSubmit={handleSubmit}
        loading={loading}
        title={title}
      />
      <Link to="/register">Register</Link>
    </>
  );
};