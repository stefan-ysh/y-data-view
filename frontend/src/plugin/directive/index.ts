export default function install(app: any) {
  const modules = import.meta.glob("./**/*.ts", {
    import: "default",
    eager: true,
  });
  for (const key in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, key)) {
      const element = modules[key];
      app.directive((key.split("/").pop() as string).split(".")[0], element);
    }
  }
}
