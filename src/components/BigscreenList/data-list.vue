<template>
  <div class="bigscreen-item" v-for="(item, index) in dataList" :key="index">
    {{ item.label }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="less" scoped>
.bigscreen-item{
    width: 100px;
    height: 100px;
    border: 1px solid red;
    border-radius: 5px;
    // background: #222;
    flex-shrink: 1;
    margin: 5px;
}
</style>
