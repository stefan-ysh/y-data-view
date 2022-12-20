<template>
  <div class="y-data-container">
    <header>
      <NavHeader @change-tab="changeTab" />
    </header>
    <div class="container-wrap">
      <component :is="curCpt" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, markRaw } from "vue";
import NavHeader from "../components/NavHeader/index.vue";
import BigscreenList from "../components/BigscreenList/index.vue";
import TemplateCenter from "../components/TemplateCenter/index.vue";
import GroupManager from "../components/GroupManager/index.vue";
const arr = [BigscreenList, TemplateCenter, GroupManager];
const curCpt = ref(markRaw(BigscreenList));

const changeTab = (tab: number) => {
  curCpt.value = markRaw(arr[tab]);
};
</script>

<style lang="less">
.y-data-container {
  position: absolute;
  inset: 0;
  background: #222;
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
