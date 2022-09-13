import { Request, Response } from "express";

import { success, error } from "../helper";
import Task from "../models/task.model";
import User from "../models/user.model";

// desc       : get all tasks
// route GET  : /api/task/
// access     : Private
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();

    res.status(201).json(success("All tasks sended", 201, tasks));
  } catch (err) {
    res.status(400).json(error("Unknow error", 400));
  }
};

// desc       : create a task
// route POST : /api/task/
// access     : Private
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, comment, followed } = req.body;
    const { user } = res.locals;

    const newTask = new Task({
      title: title,
      comment: comment,
      owner: await User.findById(res.locals.user.id),
      createdAt: Date.now(),
    });
    if (followed) newTask.followers.push(user.id);
    await newTask.save();

    res.status(200).json(success("Task added", 200));
  } catch (err) {
    res.status(400).json(error("Unknow error", 400));
  }
};

// desc       : update a task by id
// route PUT  : /api/task/:id
// access     : Private
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    await task?.update(req.body);
    if (req.body.followed) task?.followers.push(res.locals.user.id);
    else
      await task?.update({
        $pull: {
          followers: res.locals.user.id,
        },
      });
    await task?.save();
    res.status(200).json(success("Task updated", 200));
  } catch (err) {
    res.status(400).json(error("Unknow error", 400));
  }
};

// desc         : delete a task by id
// route DELETE : /api/task/:id
// access       : Private
export const deleteTask = async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(success("Task deleted", 200));
  } catch (err) {
    res.status(400).json(error("Unknow error", 400));
  }
};
