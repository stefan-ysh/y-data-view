import { useBigscreenStore } from "@/stores";
const bigscreenStore = useBigscreenStore();

async function loadModules() {
  const arr: any = [];
  const props: any = [];
  const modules = import.meta.glob("../components/**/meta.ts", {
    import: "default",
    eager: true,
  });
  Object.values(modules).forEach((module: any) => {
    arr.push(module.snippet);
    props.push({ code: module.code, props: module.configure.props });
  });
  bigscreenStore.setLeftPaneList(arr);
  bigscreenStore.setComponentProps(props);
}

export { loadModules };
