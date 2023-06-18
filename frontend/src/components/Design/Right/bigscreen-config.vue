<template>
    <n-grid style="align-items: center;" :x-gap="0" :cols="10" class="config-item" size="large">
        <n-grid-item :span="2">大屏名称</n-grid-item>
        <n-grid-item :span="8">
            <n-input @input="changeTitle" v-model:value="bigscreenInfo.title" />
        </n-grid-item>
        <n-grid-item :span="2">大屏宽度</n-grid-item>
        <n-grid-item :span="8">
            <n-input @input="changeTitle" v-model:value="bigscreenInfo.width" />
        </n-grid-item>
        <n-grid-item :span="2">大屏高度</n-grid-item>
        <n-grid-item :span="8">
            <n-input @input="changeTitle" v-model:value="bigscreenInfo.height" />
        </n-grid-item>
        <n-grid-item :span="2">公开</n-grid-item>
        <n-grid-item :span="8">
            <n-switch v-model:value="bigscreenInfo.isPublic" @update:value="changePublicStatus" />
        </n-grid-item>
        <n-grid-item :span="2">背景色</n-grid-item>
        <n-grid-item :span="8">
            <n-color-picker @update:value="handleChangeColor" :show-alpha="true" v-model:value="bigscreenInfo.bgColor" />
        </n-grid-item>
    </n-grid>
</template>
<script lang="ts" setup>
const { bigscreenInfo } = defineProps({
    bigscreenInfo: {
        type: Object,
        required: true
    }
});
const changeTitle = () => {
    return bigscreenInfo.value;
};
const changePublicStatus = () => {
    console.log('[ 2 ] >', 2)
}
const handleChangeColor = () => {
    console.log('[ 2 ] >', 2)
}
</script>