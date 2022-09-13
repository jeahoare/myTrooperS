import express from "express";

import { login } from "../controller/user.controller";
import { register } from "../controller/user.controller";

const routes = express.Router();

routes.post("/register", register).post("/login", login);

module.exports = routes;
