import { defineStore } from "pinia";
import { Bigscreen } from "@/types";
export const useBigscreenStore = defineStore("bigscreen", {
  state: () => {
    return {
      bigscreenList: [] as Array<Bigscreen>,
      total: 0
    };
  },
  actions: {
    setBigscreenList(bigscreenList: Array<Bigscreen>) {
      this.bigscreenList = bigscreenList;
    },
  },
});
