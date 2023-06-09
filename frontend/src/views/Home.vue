<template>
  <header>
    <NavHeader @change-tab="changeTab" />
  </header>
  <div class="container-wrap">
    <component :is="curCpt" />
  </div>
</template>

<script lang="ts" setup>
import { ref, markRaw, computed, onMounted } from "vue";
import NavHeader from "../components/NavHeader/index.vue";
import BigscreenList from "../components/BigscreenList/index.vue";
import TemplateCenter from "../components/TemplateCenter/index.vue";
import GroupManager from "../components/GroupManager/index.vue";
import { useSettingStore } from "@/stores/setting";
import router from "@/router";
const setting = useSettingStore();
const arr = [BigscreenList, TemplateCenter, GroupManager];
const curCpt = ref(markRaw(BigscreenList));

onMounted(() => {
  // 如果没有token，跳转到登录页
  if (!localStorage.getItem("token")) {
    router.push("/login");
  }
});
const changeTab = (tab: number) => {
  curCpt.value = markRaw(arr[tab]);
};
const bgcolor = computed(() => {
  return "red";
});
</script>

<style lang="less">
.y-data-container {
  position: absolute;
  inset: 0;
  header {
    width: 100%;
    height: 40px;
    position: absolute;
    padding-top: 10px;
  }
}
.container-wrap {
  position: absolute;
  top: 60px;
}
</style>
