import * as Method from "@/utils/request/method";
// import { LoginForm, RegisterForm } from "@/types";
export default {
  getBigscreenList: () => {
    return Method.get("api/bigscreen");
  },
  getGroupList: () => {
    return Method.get("api/group");
  },
  createGroup : (data: any) => {
    return Method.post("api/group/create", data);
  }
};
