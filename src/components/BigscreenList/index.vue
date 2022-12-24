<template>
  <div class="y-data-bigscreen-list-wrap">
    <div class="left-menu">left</div>
    <div class="right-bigscreen-list">
      <div class="content-wrap">
        <DataList :data-list="dataList" />
      </div>
      <div class="pagination-wrap">
        <n-pagination
          v-model:page="page"
          v-model:page-size="pageSize"
          :page-count="100"
          show-size-picker
          :page-sizes="[10, 20, 30, 40]"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import DataList from "./data-list.vue";
const page = ref(2);
const pageSize = ref(20);
const dataList = ref([
  { label: "警务系统", id: "1" },
  { label: "物料系统", id: "2" },
  { label: "仓库管理", id: "3" },
]);
</script>
<style lang="less" scoped>
.y-data-bigscreen-list-wrap {
  width: 100vw;
  height: calc(100vh - 60px);
  // background: red;
  display: flex;
  .left-menu {
    width: 200px;
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
    }
    .pagination-wrap {
      border-top: 1px solid red;
      height: 39px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
