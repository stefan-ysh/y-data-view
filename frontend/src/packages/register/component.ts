/*
 **全局注册组件
 ** 放在components/** 文件夹下
 */
import { defineAsyncComponent } from "vue";
const components = import.meta.glob("../components/**/*.vue"); // 异步方式

export default function install(app: any) {
  for (const [key, value] of Object.entries(components)) {
    const componentList = Object.keys(components).map((key: string) => {
      const name = key.split("/").pop().split(".")[0];
      const cpt = components[key];
      return {
        name,
        cpt,
      };
    });
    componentList.forEach((item) => {
      app.component(item.name, defineAsyncComponent(item.cpt));
    });
  }
}
