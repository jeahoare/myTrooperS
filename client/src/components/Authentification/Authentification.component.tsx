import "./style.scss";

export type AuthentificationPropsType = {
  handleSubmit: (e: React.SyntheticEvent) => void;
  email: string;
  handleChangeEmail: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  password: string,
  handleChangePwd: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  loading: boolean;
  title: string;
};

export const Authentification = ({
  handleSubmit,
  email,
  handleChangeEmail,
  password,
  handleChangePwd,
  loading,
  title
}: AuthentificationPropsType) => {
  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={handleChangeEmail}
          type="email"
          placeholder="email"
          required
        />
        <input
          value={password}
          onChange={handleChangePwd}
          type="password"
          placeholder="password"
          required
        />
        <input
          id="submit"
          type="submit"
          value={title}
          disabled={loading}
        />
      </form>
    </div>
  );
};
