import { defineStore } from "pinia";
import { Bigscreen } from "@/types";
export const useBigscreenStore = defineStore("bigscreen", {
  state: () => {
    return {
      curGroup: '' as string | number,
      groupList: [],
      bigscreenList: [] as Array<Bigscreen>,
      total: 0
    };
  },
  actions: {
    setBigscreenList(bigscreenList: Array<Bigscreen>) {
      this.bigscreenList = bigscreenList;
    },
    setGroupList(data: any) {
      this.groupList = data
    },
    setCurGroup(group: number | string) {
      this.curGroup = group
    }
  }
});
