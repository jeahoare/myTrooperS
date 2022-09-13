import { post } from "./fetch";

enum UserPath {
  REGISTER = "/user/register",
  LOGIN = "/user/login",
}

export const register = (email: string, password: string) => {
  return post({ email, password }, UserPath.REGISTER);
};

export const login = (email: string, password: string) => {
  return post({ email, password }, UserPath.LOGIN);
};
