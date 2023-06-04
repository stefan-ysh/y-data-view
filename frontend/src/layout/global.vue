<template>
    <router-view />
</template>

<script lang="ts" setup>
import { useDialog, useMessage } from "naive-ui";

// 将 dialog & message 实例方法挂载
// $message 和 $dialog 随个人喜好定义名称
// 注意不要太过于简单，以免污染其他全局定义
window.$message = useMessage();
window.$dialog = useDialog();
</script>
