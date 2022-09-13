import { useState, useCallback, useMemo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

import { Register } from "./Register.component";
import { register } from "../../api/auth";

export const RegisterContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true);
    try {
      const res = await register(email, password);
      if (res.ok) {
        navigate({
          pathname: "/login",
          search: `?${createSearchParams({
            email: email
          })}`
        });
      } else {
        alert('Email already exists');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleChangeEmail =
    useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setEmail(e.target.value), []);
  const handleChangePwd =
    useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPassword(e.target.value), []);
  const title = useMemo(() => loading ? "Loading ..." : "Register", [loading]);

  return <Register
    email={email}
    handleChangeEmail={handleChangeEmail}
    password={password}
    handleChangePwd={handleChangePwd}
    handleSubmit={registerUser}
    loading={loading}
    title={title}
  />;
}