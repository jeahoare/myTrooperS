import { Header } from "../";

import "./style.scss";

type PropsType = {
  children: JSX.Element;
};

export const DefaultPage = ({ children }: PropsType) => {
  return (
    <div className="default-page">
      <Header />
      {children}
    </div>
  );
};
