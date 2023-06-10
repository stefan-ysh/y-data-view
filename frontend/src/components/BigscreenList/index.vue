<template>
  <div class="y-data-bigscreen-list-wrap">
    <!-- <div class="left-menu">
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
            key-field="id"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
          />
          <n-button
            style="width: 100%; position: absolute; bottom: 0"
            @click="showAddGroupDialog"
            >+</n-button
          >
        </n-layout-sider>
      </n-layout>
    </div> -->
    <div class="right-bigscreen-list">
      <n-layout class="right-bigscreen-list">
        <div class="content-wrap">
          <DataList />
        </div>
        <div class="pagination-wrap">
          <n-pagination
            v-model:page="page"
            v-model:page-size="pageSize"
            :page-count="Math.ceil(total/pageSize)"
            show-size-picker
            :page-sizes="[10, 20, 30, 40]"
            :on-update:page="handlePageChange"
            :on-update:page-size="handlePageSizeChange"
          />
        </div>
      </n-layout>
    </div>
    <!-- <n-modal v-model:show="isShowAddGroupDialog">
      <n-spin :show="isLoading" description="处理中，请稍候...">
      <n-card
        style="width: 600px"
        title="Create Group"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div>
          <n-form
            ref="formRef"
            :model="groupForm"
            :rules="groupFormRules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
          >
          <n-form-item label="Root Directory" path="isRoot">
            <n-switch v-model:value="groupForm.isRoot" />
          </n-form-item>
            <n-form-item label="Parent Group" path="parentGroup" v-if="!groupForm.isRoot">
              <n-cascader
                v-model:value="groupForm.parentGroup"
                placeholder=""
                expand-trigger="hover"
                :options="menuOptions"
                label-field="label"
                value-field="id"
                children-field="children"
                check-strategy="all"
                @update:value="handleSelectChangeParentGroup"
              />
            </n-form-item>
            <n-form-item label="Group Name" path="groupName">
              <n-input v-model:value="groupForm.groupName" placeholder="" />
            </n-form-item>
            <n-form-item label="Description" path="description">
              <n-input
                placeholder=""
                v-model:value="groupForm.description"
                type="textarea"
                :autosize="{
                  minRows: 3,
                  maxRows: 5,
                }"
              />
            </n-form-item>
          </n-form>
        </div>
        <template #footer>
          <n-button style="width: 100%" type="primary" @click="addGroup">确定</n-button>
        </template>
      </n-card>
    </n-spin>
    </n-modal> -->
  </div>
</template>

<script lang="ts" setup>
import DataList from "./data-list.vue";
import { h, ref, defineComponent, onMounted, computed } from "vue";
// import { FormInst, NIcon } from "naive-ui";
// import type { MenuOption } from "naive-ui";
// import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
// import BigscreenApi from "@/api/bigscreen";
// import { Bigscreen, Group } from "@/types/bigscreen";
import { useBigscreen } from '@/hooks'
import { useBigscreenStore } from '@/stores'
const b = useBigscreenStore()
const bigscreen = useBigscreen()
// const renderMenuLabel = (option: MenuOption) => {
//   if ("href" in option) {
//     return h(
//       "a",
//       { href: option.href, target: "_blank" },
//       option.label as string
//     );
//   }
//   return option.label as string;
// };
// const renderMenuIcon = (option: MenuOption) => {
//   // 渲染图标占位符以保持缩进
//   if (option.key === "sheep-man") return true;
//   // 返回 falsy 值，不再渲染图标及占位符
//   if (option.key === "food") return null;
//   return h(NIcon, null, { default: () => h(BookmarkOutline) });
// };
// const expandIcon = () => {
//   return h(NIcon, null, { default: () => h(CaretDownOutline) });
// };
const total = computed(() => b.total)
const page = ref(1);
const pageSize = ref(10);
// change page
const handlePageChange = (p: number) => {
  page.value = p;
  getBigscreenList();
}

// change page size
const handlePageSizeChange = (size: number) => {
  page.value = 1;
  pageSize.value = size;
  getBigscreenList();
}
// const menuOptions = ref<Group[] | any>([]);
// const collapsed = ref(false);
// ! todo axios 接口待完善
// const dataList = ref<Bigscreen[] | any>([]);
onMounted(async () => {
  // getGroupList();
  getBigscreenList();
});

// get all bigscreen list
const getBigscreenList = async () => {
  const params = {
    title: '',
    page: page.value,
    pageSize: pageSize.value
  }
  window.$message.loading("加载中...");
  await bigscreen.getBigscreenList(params);
  // const res = await bigscreen.getBigscreenList(params);
  // if (res.code === 200) {
  //   window.$message.destroyAll();
  //   total.value = res.data.total
  //   dataList.value = res.data.list;
  // }
};

// get all group list
// const getGroupList = async () => {
//   const res = await BigscreenApi.getGroupList();
//   if (res.code === 200) {
//     menuOptions.value = res.data;
//   }
// };
// const formRef = ref<FormInst | null>(null)
// const groupForm = ref({
//   isRoot: false,
//   groupName: '',
//   description: '',
//   parentGroup: null,
// });
// const groupFormRules = {
//   groupName: {
//     required: true,
//     trigger: ["blur", "input"],
//     message: "Group name is required!",
//   },
//   parentGroup: {
//     required: groupForm.value.isRoot ? false : true,
//     // trigger: ["blur", "input"],
//     // message: "Parent group is required!",
//   },
// };

// show add group dialog
// const isShowAddGroupDialog = ref(false);

// handle select change
// const handleSelectChangeParentGroup = (value: any) => {
//   console.log(value);
// };

// show add group dialog
// const showAddGroupDialog = () => {
//   isShowAddGroupDialog.value = true;
// };

// const isLoading = ref(false);

// handle add group
// const addGroup = (e: MouseEvent) => {
//   e.preventDefault()
//   formRef.value?.validate((error: any) => {
//     if (!error) {
//       isLoading.value = true
//       BigscreenApi.createGroup({
//         label: groupForm.value.groupName,
//         description: groupForm.value.description,
//         parentId: groupForm.value.parentGroup
//       }).then(res=>{
//         if(res.code === 200){
//           isShowAddGroupDialog.value = false
//           getGroupList()
//           window.$message.success(res.msg)
//         } else {
//           window.$message.error(res.msg)
//         }
//         isLoading.value = false
//       }).catch(err=>{
//         isLoading.value = false
//         console.log('[ err ] >', err)
//       })
//     } else {
//       console.log("error submit!!");
//       return false;
//     }
//   });
// };
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
      // align-items: flex-start;
      flex-wrap: wrap;
      // justify-content: space-between;
      align-content: flex-start;
      padding: 10px;
      box-sizing: border-box;
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
