import { computed } from "vue";
import { useSettingStore } from "@/stores";
import { zhCN, enUS, dateEnUS, dateZhCN } from "naive-ui";

export const useLang = () => {
  const setting = useSettingStore();

  const locale = computed(() => {
    return setting.lang === "zh" ? zhCN : enUS;
  });

  const dateLocale = computed(() => {
    return setting.lang === "zh" ? dateZhCN : dateEnUS;
  });

  return {
    locale,
    dateLocale,
  };
};
