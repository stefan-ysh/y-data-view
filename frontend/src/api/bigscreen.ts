import * as Method from "@/utils/request/method";
// import { LoginForm, RegisterForm } from "@/types";
export const getBigscreenList = () => {
  return Method.get("api/bigscreen");
};
