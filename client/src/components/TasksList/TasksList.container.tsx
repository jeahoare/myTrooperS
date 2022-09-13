import { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";

import { MemoizedTasksList as TasksList } from "./TasksList.component"
import { TasksContext } from "../../context/tasks/store";
import { allTasks, TASK } from "../../api/tasks";

export const TasksListContainer = () => {
  const [filteredTasks, setFilteredTasks] = useState<TASK[]>([]);
  const { tasks, setTasks, search, showOwnTasks, showTasksWithFlag } = useContext(TasksContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await allTasks();
        setTasks(res.data);
      } catch (_) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, [setTasks]);

  // Filter tasks
  useEffect(() => {

    const token = localStorage.getItem("token");
    const { id }: any = jwt_decode(token || "");
    let newTasksList: TASK[] = [...tasks];

    if (search)
      newTasksList = newTasksList.filter(
        (task: TASK) => task.title.includes(search) || task.comment.toLowerCase().includes(search.toLocaleLowerCase()));
    if (showOwnTasks)
      newTasksList = newTasksList.filter((task: TASK) => task.owner === id);
    if (showTasksWithFlag)
      newTasksList = newTasksList.filter((task: TASK) => task?.followers?.includes(id));
    setFilteredTasks(newTasksList)
  }, [search, showOwnTasks, showTasksWithFlag, tasks]);

  if (filteredTasks.length)
    return <TasksList tasks={filteredTasks} />;
  return <></>;
};
