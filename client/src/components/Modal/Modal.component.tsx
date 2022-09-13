import { useContext } from "react";

import { TasksContext } from "../../context/tasks/store";

import "./style.scss";

type PropsType = {
  children: JSX.Element;
}

export const Modal = ({ children }: PropsType) => {
  const { setIsModalOpen } = useContext(TasksContext);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={setIsModalOpen}>&times;</span>
        {
          children
        }
      </div>
    </div>
  );
};