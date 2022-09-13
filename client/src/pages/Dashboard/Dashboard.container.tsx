import { useContext } from "react";

import { TasksContext } from "../../context/tasks/store";
import { Dashboard } from "./Dashboard.component"

export const DashboardContainer = () => {
  const { isModalOpen } = useContext(TasksContext);

  return (
    <Dashboard isModalOpen={isModalOpen} />
  );
};