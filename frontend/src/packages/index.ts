import { useBigscreenStore } from "@/stores";
const bigscreenStore = useBigscreenStore();

async function loadModules() {
  const arr: any = [];
  const modules = import.meta.glob("./components/**/meta.ts", {
    import: "default",
    eager: true,
  });
  Object.values(modules).forEach((module: any) => {
    arr.push(module.snippet);
  });
  bigscreenStore.setLeftPaneList(arr);
}

export default loadModules;
