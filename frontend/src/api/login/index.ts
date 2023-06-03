import * as Method from "@/utils/request/method";
import { LoginForm, RegisterForm } from "@/types";
export const login = (data: LoginForm) => {
  return Method.post("api/login", data);
};
export const register = (data: RegisterForm) => {
  return Method.post("api/register", data);
};
