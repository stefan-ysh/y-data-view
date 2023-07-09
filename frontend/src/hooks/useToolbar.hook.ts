import route from "@/router";
import { useDesignStore } from "@/stores/bigscreen/design";
import { useBigscreen } from "./useBigscreen.hook";
const { updateBigscreen } = useBigscreen();
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

  const update = async () => {
    // 加载中
    window.$message.loading("保存中...");
    const designStore = useDesignStore();
    const res = await updateBigscreen(designStore.curBigscreen);
    if (res.code === 200) {
      window.$message.success("保存成功");
    } else {
      window.$message.error(res.msg);
    }
    // 关闭加载中
    window.$message.destroyAll();

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
    update
  };
};

export default useToolbar;
