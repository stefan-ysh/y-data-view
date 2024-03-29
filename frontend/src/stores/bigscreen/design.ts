import { defineStore } from "pinia";
export const useDesignStore = defineStore("bigscreen-design", {
  state: () => {
    return {
      leftPaneList: [],

      componentProps: {} as any,
      curBigscreen: {
        bgColor: "",
        bgImg: "",
        description: "",
        group: "",
        height: 1080,
        id: "",
        isPublic: false,
        password: "",
        thumb: "",
        title: "",
        width: 1920,
        components: [],
      } as any,
      currentComponent: null as any,
      leftPaneCollapsed: false,
      rightPaneCollapsed: false,
    };
  },
  actions: {
    setComponentProps(componentProps: any) {
      componentProps.forEach((item: any) => {
        const { code, props, style } = item;
        props.forEach((prop: any) => {
          prop.type = 'props'
        })
        style.forEach((prop: any) => {
          prop.type = 'style'
        })
        this.componentProps[code] = {props, style};
      });
    },

    setLeftPaneList(data: any) {
      this.leftPaneList = data;
    },
    setCurrentComponent(cpt: any) {
      this.currentComponent = cpt;
    },
    setComponents(cpts: any) {
      this.curBigscreen.components = cpts;
    },
    addComponent(cpt: any) {
      this.curBigscreen.components.push(cpt);
      this.setCurrentComponent(cpt);
    },
    setCurBigscreen(bigscreen: any) {
      this.curBigscreen = bigscreen;
    },
    setLeftPaneCollapsed(collapsed: boolean) {
      this.leftPaneCollapsed = collapsed;
    },
    setRightPaneCollapsed() {
      this.rightPaneCollapsed = !this.rightPaneCollapsed;
    },
    removeComponent(id: string) {
      this.curBigscreen.components = this.curBigscreen.components.filter(
        (cpt: any) => cpt.id !== id
      );
    }
  },
});
