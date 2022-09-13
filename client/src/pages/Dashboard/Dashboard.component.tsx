import { TaskForm, Modal, TasksList, TasksManager, Logout } from "../../components";

import "./style.scss";

type PropsType = {
  isModalOpen: boolean;
};

export const Dashboard = ({ isModalOpen }: PropsType) => {
  return (
    <div className='dashboard-page'>
      {isModalOpen &&
        <Modal>
          <TaskForm />
        </Modal>
      }
      <Logout />
      <TasksManager />
      <TasksList />
    </div>
  );
};