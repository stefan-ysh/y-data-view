import { useDesignStore } from "@/stores/bigscreen/design";
const designStore = useDesignStore();

async function loadModules() {
  const arr: any = [];
  const props: any = [];
  const modules = import.meta.glob("../components/**/meta.ts", {
    import: "default",
    eager: true,
  });
  Object.values(modules).forEach((module: any) => {
    arr.push(module.snippet);
    props.push({ code: module.code, props: module.configure.props, style: module.configure.style });
  });
  designStore.setLeftPaneList(arr);
  designStore.setComponentProps(props);
}

export { loadModules };
