<template>
  <div class="bigscreen-item" v-for="(item, index) in b.bigscreenList" :key="index">
    <n-image class="bc-img" :img-props="{ style: { width: '100%' } }" :src="item.thumb" />
    <div class="item-operate-wrap">
      <span class="item-title">{{ item.title }}</span>
      <div class="item-operate">
        <Icon class="op-icon">
          <EyeOutlineIcon />
        </Icon>
        <Icon class="op-icon" @click="handleEdit(item)">
          <EditIcon />
        </Icon>
        <n-dropdown trigger="hover" :options="options" @select="handleSelect($event, item)">
          <Icon class="op-icon">
            <EllipsisHorizontalCircleSharpIcon />
          </Icon>
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
// import bigscreen from "@/api/bigscreen";
import { useBigscreenStore } from '@/stores'
import { useBigscreen } from '@/hooks'
const bigscreen = useBigscreen()
const b = useBigscreenStore()
const router = useRouter()

const { EyeOutlineIcon, EditIcon, LogoutIcon, EllipsisHorizontalCircleSharpIcon } =
  icon.ionicons5;

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
    label: $t("global.r_delete"),
    key: "delete"
  },
]);

// confirm when click the delete button
const handleDel = async (item: Bigscreen) => {
  window.$dialog.warning({
    title: '操作提示',
    content: '确定删除?',
    positiveText: '取消',
    negativeText: '确定',
    onNegativeClick: async () => {
      const id = item.id
      const res = await bigscreen.delBigscreen(id)
      if (res.code === 200) {
        window.$message.success("删除成功")
        bigscreen.getBigscreenList()
      }
    }
  })
}

// select the item of dropdown menu
const handleSelect = (key: string | number, item: Bigscreen) => {
  switch (key) {
    case "copy":
      break;
    case "rename":
      break;
    case "delete":
      handleDel(item);
      break;
    default:
      break;
  }
};

// go to design page with id of the item
const handleEdit = (item: Bigscreen) => {
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
  border: 1px solid #313138;
  border-radius: 5px;
  aspect-ratio: 16/13;
  // flex: 1;
  cursor: pointer;
  overflow: hidden;
  transition: all .8s;
  margin: 0 30px 30px 0; // 间隙为5px
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // 小屏幕只显示一行两个
  @media screen and (min-width: 769px) {
    width: calc((100% - 150px) / 5); // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
    min-width: calc((100% - 150px) / 5); // 加入这两个后每个item的宽度就生效了
    max-width: calc((100% - 150px) / 5); // 加入这两个后每个item的宽度就生效了

    &:nth-child(5n) {
      // 去除第5n个的margin-right
      margin-right: 0;
    }
  }

  // 小屏幕只显示一行两个
  @media screen and (max-width: 768px) {
    width: calc((100% - 60px) / 2);
    min-width: calc((100% - 60px) / 2);
    max-width: calc((100% - 60px) / 2);

    &:nth-child(2n) {
      // 去除第2n个的margin-right
      margin-right: 0;
    }
  }

  // opacity: .8;

  &:hover {
    // border: 10px solid rgba(81, 76, 175, 0.498);
    border-width: 3px;
    opacity: 1;
  }

  .bc-img {
    /deep/img {
      // width: 100%;
    }
  }

  .item-operate-wrap {
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 5px;

    .item-title {}

    .item-operate {
      .op-icon {
        cursor: pointer;
        margin-right: 5px;
      }
    }
  }
}</style>
