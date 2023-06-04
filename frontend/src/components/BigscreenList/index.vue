<template>
  <div class="y-data-bigscreen-list-wrap">
    <div class="left-menu">
      <n-layout has-sider style="height: 100%">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="60"
          :width="250"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="60"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
          />
        </n-layout-sider>
      </n-layout>
    </div>
    <div class="right-bigscreen-list">
      <n-layout class="right-bigscreen-list">
        <div class="content-wrap">
          <DataList :data-list="dataList" />
        </div>
        <div class="pagination-wrap">
          <n-pagination
            v-model:page="page"
            v-model:page-size="pageSize"
            :page-count="DataList.length"
            show-size-picker
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </n-layout>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataList from "./data-list.vue";
import { h, ref, defineComponent, onMounted } from "vue";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { getBigscreenList } from "@/api/bigscreen";
import { BigscreenItem } from "@/types/bigscreen";
const renderMenuLabel = (option: MenuOption) => {
  if ("href" in option) {
    return h(
      "a",
      { href: option.href, target: "_blank" },
      option.label as string
    );
  }
  return option.label as string;
};
const renderMenuIcon = (option: MenuOption) => {
  // 渲染图标占位符以保持缩进
  if (option.key === "sheep-man") return true;
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === "food") return null;
  return h(NIcon, null, { default: () => h(BookmarkOutline) });
};
const expandIcon = () => {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
};
const menuOptions: MenuOption[] = [
  {
    label: "默认分组",
    key: "hear-the-wind-sing",
    href: "https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199",
  },
  {
    label: "大数据",
    key: "pinball-1973",
    disabled: false,
    children: [
      {
        label: "双十一天猫营业额",
        key: "rat",
      },
    ],
  },
  {
    label: "仓储",
    key: "a-wild-sheep-chase",
    disabled: false,
  },
  {
    label: "运营数据监控",
    key: "dance-dance-dance",
    children: [
      {
        type: "group",
        label: "销售",
        key: "people",
        children: [
          {
            label: "食品类",
            key: "narrator",
          },
          {
            label: "日常用品类",
            key: "sheep-man",
          },
        ],
      },
    ],
  },
];
const collapsed = ref(false);
const page = ref(2);
const pageSize = ref(20);
// ! todo axios 接口待完善
const dataList = ref<BigscreenItem[]| any>([]);
onMounted(async () => {
  const res = await getBigscreenList()
  if(res.code === 200){
    dataList.value = res.data
  } else {
  }
})
</script>
<style lang="less" scoped>
.y-data-bigscreen-list-wrap {
  width: 100vw;
  height: calc(100vh - 60px);
  // background: red;
  display: flex;
  .left-menu {
    height: 100%;
    background: grey;
  }
  .right-bigscreen-list {
    width: 100%;
    height: 100%;
    // background-color: rgb(255, 255, 255);
    .content-wrap {
      height: calc(100% - 40px);
      overflow: scroll;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
    .pagination-wrap {
      border-top: 1px solid rgb(159, 117, 117);
      height: 39px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
