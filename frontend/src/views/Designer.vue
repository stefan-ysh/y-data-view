<template>
<header>当前大屏 id 为{{ router.currentRoute.value.query.id }}</header>
    <div>body</div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

</script>
<style scoped></style>