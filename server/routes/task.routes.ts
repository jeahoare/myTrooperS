import express from "express";

import { authenticateJWT } from "../helper";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controller/task.controller";

const routes = express.Router();

routes
  .get("/", authenticateJWT, getTasks)
  .post("/", authenticateJWT, createTask)
  .put("/:id", authenticateJWT, updateTask)
  .delete("/:id", authenticateJWT, deleteTask);

module.exports = routes;
