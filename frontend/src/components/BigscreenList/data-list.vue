<template>
  <div class="bigscreen-item" v-for="(item, index) in dataList" :key="index">
    <n-image class="bc-img" width="200" src="src/assets/images/demo.jpg" />
    <div class="item-operate-wrap">
      <span class="item-title">{{ item.title }}</span>
      <div class="item-operate">
        <Icon class="op-icon"> <EyeOutlineIcon /> </Icon>
        <Icon class="op-icon" @click="handleEdit(item)"> <EditIcon /> </Icon>
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <Icon class="op-icon"> <EllipsisHorizontalCircleSharpIcon /> </Icon>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { icon } from "@/icon";
import { Icon } from "@vicons/utils";
import { useRouter } from 'vue-router'
import { Bigscreen } from '@/types/bigscreen'
const router = useRouter()

const { EyeOutlineIcon, EditIcon, LogoutIcon, EllipsisHorizontalCircleSharpIcon } =
  icon.ionicons5;
const props = defineProps({
  dataList: {
    type: Array<Bigscreen>,
    default: [],
  },
});
const options = computed(() => [
  {
    label: $t("global.r_copy"),
    key: "copy",
    // disabled: true,
  },
  // {
  //   label: $t("global.r_preview"),
  //   key: "preview",
  //   // disabled: true,
  // },
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

// go to design page with id of the item
const handleEdit = (item: any) => {
  router.push({
    name: "Design",
    query: {
      id: item.id,
    },
  });
}
</script>

<style lang="less" scoped>
.bigscreen-item {
  width: 200px;
  // height: 200px;
  // padding: 5px;
  border: 1px solid rgb(155, 112, 112);
  border-radius: 5px;
  // background: #222;
  flex-shrink: 1;
  margin: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: all .3s;
  &:hover {
    box-shadow: 5px 5px 10px  rgba(127, 152, 205, 0.2);
  }
  .bc-img {
  }
  .item-operate-wrap {
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 5px;
    .item-title {
      
    }
    .item-operate {
      .op-icon {
        cursor: pointer;
        margin-right: 5px;
      }
    }
  }
}
</style>
