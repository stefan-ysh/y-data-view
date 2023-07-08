import route from "@/router";
const useToolbar = () => {
  const goBack = async () => {
    route.go(-1);
  };

  const switchDevice = async (device: 'PC' | 'mobile') => {
    console.log("切换设备", device);
  };

  const undo = async () => {
    console.log("撤销");
  };

  const redo = async () => {
    console.log("重做");
  };

  const importFrom = async () => {
    console.log("导入");
  };

  const exportAs = async () => {
    console.log("导出");
  };

  const clearCanvas = async () => {
    console.log("清空画布");
  };

  const preview = async () => {
    console.log("预览");
  };

  const save = async () => {
    console.log("保存");
  };

  return {
    goBack,
    switchDevice,
    undo,
    redo,
    importFrom,
    exportAs,
    clearCanvas,
    preview,
    save
  };
};

export default useToolbar;
