<script setup lang="ts">
import Home from "./views/Home.vue";
import { useLang, useTheme } from "@/hooks";
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
import { useSettingStore } from "@/stores/setting";
import { I18n } from '@/components/I18n'
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
    <router-view></router-view>
  </n-config-provider>
</template>
