import { createI18n } from "vue-i18n";
import zh from "./zh";
import en from "./en";

const messages = {
  en,
  zh,
};
// 这是获取浏览器的语言
const language = (navigator.language || "en").toLocaleLowerCase();
const i18n = createI18n({
  locale:
  localStorage.getItem("layout") &&
    JSON.parse(localStorage.getItem("layout")).lang ||
    language.split("-")[0] ||
    "en",
  fallbackLocale: "en", // 设置备用语言
  messages,
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
});
const languageList = Object.freeze([
  { label: "中文", key: "zh" },
  { label: "English", key: "en" },
]);
export { i18n, languageList };
