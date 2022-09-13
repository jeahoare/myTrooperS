import { post, get, update, deleteItem } from "./fetch";

export type TASK = {
  _id: number;
  title: string;
  comment: string;
  followers: [number];
  owner: number;
  createdAt: Date;
};

enum TaskPath {
  ALL_TASKS = "/task",
  ADD_TASK = "/task",
  UPDATE_TASK = "/task/",
  DELETE_TASK = "/task/",
}

export const allTasks = () => {
  return get(TaskPath.ALL_TASKS);
};

export const addTask = (task: TASK) => {
  return post(task, TaskPath.ADD_TASK);
};

export const updateTask = (task: TASK, id: number) => {
  return update(task, TaskPath.UPDATE_TASK + id);
};

export const deleteTask = (id: number) => {
  return deleteItem(TaskPath.UPDATE_TASK + id);
};
