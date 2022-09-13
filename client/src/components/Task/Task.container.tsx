import { memo, useState, useCallback, useContext, useMemo } from "react"
import jwt_decode from "jwt-decode";

import { Task } from "./Task.component";
import { deleteTask, allTasks, TASK, updateTask } from "../../api/tasks";
import { TasksContext } from "../../context/tasks/store";

type PropsType = {
  task: TASK;
};

const TaskContainer = ({ task }: PropsType) => {
  const [loading, setLoading] = useState(false);
  const { setTasks, setIsModalOpen, setTaskToUpdate } = useContext(TasksContext);

  const token = useMemo(() => localStorage.getItem('token'), []);
  const { id }: any = useMemo(() => jwt_decode(token || ""), [token]);
  const canUpdate = useMemo(() => id === task.owner, [id, task]);
  const isFollowed: boolean = useMemo(() => task?.followers?.includes(id) || false, [id, task]);

  const deleteItem = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await deleteTask(id);
      const res = await allTasks();
      setTasks(res.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [setTasks]);

  const update = useCallback(async (task: TASK) => {
    setIsModalOpen();
    setTaskToUpdate(task);
  }, [setIsModalOpen, setTaskToUpdate]);

  const handleFollow = useCallback(async (task: TASK) => {
    setLoading(true);
    const newTask = { ...task, followed: !isFollowed };
    try {
      await updateTask(newTask, task._id);
      const res = await allTasks();
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [isFollowed, setTasks]);

  return <Task
    task={task}
    updateTask={update}
    deleteTask={deleteItem}
    canUpdate={canUpdate}
    loading={loading}
    isFollowed={isFollowed}
    handleFollow={handleFollow}
  />
};

export const MemoizedTaskContainer = memo(TaskContainer);