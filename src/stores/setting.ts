import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      theme: 'dark',
      lang: 'zh',
    };
  },
  actions: {
    init() {
      const cacheLayout = JSON.parse(localStorage.getItem("layout"));
      if (cacheLayout) {
        this.theme = cacheLayout.theme;
        this.lang = cacheLayout.lang;
      }
      this.cacheLayout();
    },
    changeTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      this.cacheLayout();
    },
    changeLanguage(key: "zh" | "en") {
      this.lang = key;
      this.cacheLayout();
    },
    cacheLayout() {
      const layoutObj = {
        theme: this.theme,
        lang: this.lang,
      };
      localStorage.setItem("layout", JSON.stringify(layoutObj));
    },
  },
});
