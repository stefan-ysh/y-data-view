import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      theme: "dark",
      lang: "zh",
    };
  },
  actions: {
    init() {
      try {
        const cacheLayout = JSON.parse(localStorage.getItem("layout") || "");
        if (cacheLayout) {
          this.theme = cacheLayout.theme;
          this.lang = cacheLayout.lang;
        }
      } catch (error) {
        console.error("Error parsing cached layout:", error);
      }
      this.cacheLayout();
    },
    changeTheme(event: MouseEvent) {
      // 检查当前浏览器是否支持transition
      const isAppearanceTransition =
        // @ts-expect-error: Transition API
        document.startViewTransition &&
        !window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
      // 如果不支持,则直接更改主题
      if (!isAppearanceTransition) {
        this.theme = this.theme === "dark" ? "light" : "dark";
        this.cacheLayout();
        return;
      }
      // 如果支持,则执行更换主题的动画
      const x = event.x;
      const y = event.y;
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      );
      // @ts-expect-error: Transition API
      const transition = document.startViewTransition(() => {
        // html 元素切换 dark类名，以此达到更换主题色的目的
        this.theme = this.theme === "dark" ? "light" : "dark";
        this.cacheLayout();
      });
      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        // todo 被黑暗吞噬的感觉的动画
        // const c = this.theme === "light" ? clipPath : [...clipPath].reverse();
        // const pseudoElement =
        //   this.theme === "light"
        //     ? "::view-transition-new(root)"
        //     : "::view-transition-old(root)";
        const c = clipPath
        const pseudoElement = "::view-transition-new(root)"
        document.documentElement.animate(
          {
            clipPath: c,
          },
          {
            duration: 300,
            easing: "ease-in",
            pseudoElement,
          }
        );
      });
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
