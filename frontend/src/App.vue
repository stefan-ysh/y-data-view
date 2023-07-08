<script setup lang="ts">
import { useLang, useTheme } from "@/hooks";
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
import { useSettingStore } from "@/stores";
import { I18n } from '@/components/I18n'
import { NMessageProvider, NDialogProvider } from "naive-ui";
// 引入上面你所定义的全局挂载组件
import GlobalContainer from "@/layout/global.vue";
const setting = useSettingStore();
setting.init();
// 全局语言
const { locale, dateLocale } = useLang();

const { theme } = useTheme();
</script>

<template>
  <n-config-provider :theme="theme" :locale="locale" :date-locale="dateLocale">
    <I18n></I18n>
    <!-- <Home /> -->
    <n-message-provider>
        <n-dialog-provider>
            <global-container />
        </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<style>
body {
  margin: 0;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 9999;
}

.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}
</style>
