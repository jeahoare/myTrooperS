import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_JTW } from "./config";
import User from "./models/user.model";

export const success = (
  message: string,
  statusCode: number,
  data?: object
) => ({
  message,
  data,
  statusCode,
  ok: true,
});

export const error = (message: string, statusCode: number) => ({
  message,
  statusCode,
  ok: false,
});

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, SECRET_JTW, async (err, user) => {
        const tokenDecode = jwt.decode(token) as jwt.JwtPayload;

        if (err || !(await User.findById(tokenDecode.id))) {
          return res.status(401).json(error("User not found", 401));
        }
        res.locals.user = user;
        next();
      });
    } catch (err) {
      res.status(401).json(error("Wrong token", 401));
    }
  } else {
    res.status(401).json(error("Wrong authorization", 401));
  }
};
