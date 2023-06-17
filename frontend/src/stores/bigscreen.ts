import { defineStore } from "pinia";
import { Bigscreen } from "@/types";
export const useBigscreenStore = defineStore("bigscreen", {
  state: () => {
    return {
      leftPaneList: [],
      curGroup: "" as string | number,
      groupList: [],
      bigscreenList: [] as Array<Bigscreen>,
      componentProps: {} as any,
      total: 0,
    };
  },
  actions: {
    setBigscreenList(bigscreenList: Array<Bigscreen>) {
      this.bigscreenList = bigscreenList;
    },
    setComponentProps(componentProps: any) {
      componentProps.forEach((item: any) => {
        const { code, props } = item;
        this.componentProps[code] = props;
      });
    },
    setGroupList(data: any) {
      this.groupList = data;
    },
    setCurGroup(group: number | string) {
      this.curGroup = group;
    },
    setLeftPaneList(data: any) {
      this.leftPaneList = data;
    },
  },
});
