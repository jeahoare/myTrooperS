import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Login } from "./Login.component";
import { login } from "../../api/auth";


export const LoginContainer = () => {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);

      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token)
        navigate('/', { replace: true })
      } else {
        alert('Wrong email or/and password');
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false);
  };

  const handleChangeEmail =
    useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setEmail(e.target.value), []);
  const handleChangePwd =
    useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPassword(e.target.value), []);
  const title = useMemo(() => loading ? "Loading ..." : "Login", [loading]);

  useEffect(() => {
    const emailParams = searchparams.get('email');
    if (emailParams) setEmail(emailParams);
  }, [searchparams]);

  return <Login
    email={email}
    handleChangeEmail={handleChangeEmail}
    password={password}
    handleChangePwd={handleChangePwd}
    handleSubmit={loginUser}
    loading={loading}
    title={title}
  />;
}