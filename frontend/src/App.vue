<script setup lang="ts">
import { useLang, useTheme } from "@/hooks";
import { useSettingStore } from "@/stores/setting";
import { I18n } from '@/components/I18n'
// 引入上面你所定义的全局挂载组件
// import GlobalContainer from "@/layout/global.vue";
const setting = useSettingStore();
setting.init();
// 全局语言
// const { locale, dateLocale } = useLang();

// const { theme } = useTheme();
</script>

<template>
  <I18n />
  <router-view/>
</template>
<style>
body {
  margin: 0;
}
</style>