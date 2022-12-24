<script setup lang="ts">
import Home from "./views/Home.vue";
import { darkTheme } from "naive-ui";
import { ref } from "vue";
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";

// 样式覆盖
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#FF0000",
  },
  Button: {
    textColor: "#FF0000",
  },
};


const theme = ref(darkTheme);
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <Home />
  </n-config-provider>
</template>
