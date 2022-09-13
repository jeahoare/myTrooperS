import { useContext, useCallback } from "react";

import { TasksContext } from "../../context/tasks/store";
import { TasksManager } from "./TasksManager.component";

export const TasksManagerContainer = () => {
  const {
    search,
    showOwnTasks,
    showTasksWithFlag,
    setSearch,
    toggleShowOwnTasks,
    toggleShowTasksWithFlag,
    setIsModalOpen,
    setTaskToUpdate
  } = useContext(TasksContext);

  const handleSearch =
    useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearch(e.target.value), [setSearch]);
  const openModal = useCallback(() => {
    setTaskToUpdate(null);
    setIsModalOpen();
  }, [setTaskToUpdate, setIsModalOpen]);

  return (
    <TasksManager
      handleModal={openModal}
      toggleShowTasksWithFlag={toggleShowTasksWithFlag}
      toggleShowOwnTasks={toggleShowOwnTasks}
      handleChangeSearch={handleSearch}
      search={search}
      showOwnTasks={showOwnTasks}
      showTasksWithFlag={showTasksWithFlag}
    />
  );
};