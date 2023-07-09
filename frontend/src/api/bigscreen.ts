import * as Method from "@/utils/request/method";
import { Bigscreen, Group } from "@/types";
export default {
  getBigscreenList: (params: { page: number; pageSize: number, title: string }) => {
    return Method.get("api/bigscreen", params);
  },
  getGroupList: () => {
    return Method.get("api/group");
  },
  createGroup : (data: Group) => {
    return Method.post("api/group/create", data);
  },
  createBigscreen : (data: Bigscreen) => {
    return Method.post("api/bigscreen/create", data);
  },
  delBigscreen: (id: number) => {
    return Method.post("api/bigscreen/del", { id });
  },
  getBcDetail: (id: number | string) => {
    return Method.get("api/bigscreen/detail", { id });
  },

  updateBigscreen: (data: Bigscreen) => {
    return Method.post("api/bigscreen/update", data);
  },
};
