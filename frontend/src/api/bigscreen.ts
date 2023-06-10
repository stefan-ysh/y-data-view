import * as Method from "@/utils/request/method";
// import { LoginForm, RegisterForm } from "@/types";
export default {
  getBigscreenList: (params: { page: number; pageSize: number, title: string }) => {
    return Method.get("api/bigscreen", params);
  },
  getGroupList: () => {
    return Method.get("api/group");
  },
  createGroup : (data: any) => {
    return Method.post("api/group/create", data);
  },
  delBigscreen: (id: number) => {
    return Method.post("api/del/bigscreen", { id });
  }
};
