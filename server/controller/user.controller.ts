import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { success, error } from "../helper";
import User from "../models/user.model";
import { SECRET_JTW } from "../config";

// desc       : create a user
// route GET  : /api/user/register
// access     : Public
export const register = async (req: Request, res: Response) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hashPassword,
      createdAt: Date.now(),
    });
    res.status(201).json(success("Register completed", 201));
  } catch (err) {
    res.status(409).json(error("Duplicate email", 409));
  }
};

// desc       : Generate a token
// route GET  : /api/user/login
// access     : Public
export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    res.status(404).json(error("Invalid login", 403));
    return;
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordMatch) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET_JTW
    );

    res.status(200).json(success("User logged", 200, { token: token }));
  } else {
    res.status(400).json(error("Wrong password", 400));
  }
};
