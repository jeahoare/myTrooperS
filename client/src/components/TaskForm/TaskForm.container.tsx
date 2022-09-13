import { useCallback, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";

import { addTask, allTasks, updateTask } from "../../api/tasks";
import { TasksContext } from "../../context/tasks/store";
import { TaskForm } from "./TaskForm.component"

export const TaskFormContainer = () => {
  const { taskToUpdate: task, setIsModalOpen, setTasks }: any = useContext(TasksContext);

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update the task if present in the store or create it.
  const handleSubmit = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const newTask = { ...task, title: title, comment: comment, followed: followed };

    try {
      if (task)
        await updateTask(newTask, task._id)
      else
        await addTask(newTask);
      const res = await allTasks();
      setTasks(res?.data);
      setIsModalOpen();
    } catch (_) {
      setLoading(false);
    }
  }, [title, comment, followed, task, setTasks, setIsModalOpen]);

  // Fill the form with the task to be updated
  useEffect(() => {
    if (task) {
      const token = localStorage.getItem('token');
      const { id }: any = jwt_decode(token || "");
      const followed = task.followers.includes(id);

      const { title, comment } = task;
      setTitle(title);
      setComment(comment);
      setFollowed(followed);
    }
  }, [task]);

  const handleChangeTitle =
    useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value), []);
  const handleChangeComment =
    useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value), []);
  const handleChangeFlag = useCallback(() => setFollowed(!followed), [followed]);

  return <TaskForm
    handleSubmit={handleSubmit}
    handleChangeComment={handleChangeComment}
    handleChangeTitle={handleChangeTitle}
    handleChangeFollowed={handleChangeFlag}
    title={title}
    comment={comment}
    followed={followed}
    loading={loading}
  />
};