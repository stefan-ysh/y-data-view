import { computed } from "vue";
import { useSettingStore } from "@/stores";
import { darkTheme, lightTheme } from "naive-ui";

export const useTheme = () => {
  const setting = useSettingStore();

  const theme = computed(() => {
    return setting.theme === "dark" ? darkTheme : lightTheme;
  });

  return {
    theme
  };
};
