<template>
  <div class="bigscreen-item" v-for="(item, index) in dataList" :key="index">
    <n-image width="200" src="src/assets/images/demo.jpg" />
    <div
      style="
        display: flex;
        height: 20px;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        margin-bottom: 5px;
      "
    >
      <span>测试大屏</span>
      <Icon> <SunnyIcon /> </Icon>
      <Icon> <EditIcon /> </Icon>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <Icon> <EllipsisHorizontalCircleSharpIcon /> </Icon>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { icon } from "@/icon";
import { Icon } from "@vicons/utils";

const { SunnyIcon, EditIcon, LogoutIcon, EllipsisHorizontalCircleSharpIcon } =
  icon.ionicons5;
const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  },
});
const options = computed(() => [
  {
    label: $t("global.r_copy"),
    key: "copy",
    // disabled: true,
  },
  {
    label: $t("global.r_preview"),
    key: "preview",
    // disabled: true,
  },
  {
    label: $t("global.r_rename"),
    key: "rename",
    // disabled: true,
  },
  {
    label: $t("global.r_unpublish"),
    key: "unpublish",
  },
]);
const handleSelect = (key: string | number) => {
  console.log(key);
};
</script>

<style lang="less" scoped>
.bigscreen-item {
  width: 200px;
  // height: 200px;
  // padding: 5px;
  border: 1px solid red;
  border-radius: 5px;
  // background: #222;
  flex-shrink: 1;
  margin: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: all .3s;
  &:hover {
    box-shadow: 5px 5px 10px  rgba(147, 124, 124, 0.5);

  }
}
</style>
