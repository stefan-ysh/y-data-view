<script setup lang="ts">
const props = defineProps({
    props: {
        type: Object,
        default: () => {
            return {}
        }
    },
    styleObj: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
</script>

<template>
    <div class="img-cpt-wrap">
        <n-image :fallback-src="props.props.fallbackSrc" :show-toolbar="props.props.showToolbar"
            :show-toolbar-tooltip="props.props.showToolbarTooltip" :preview-disabled="!props.props.previewDisabled"
            :alt="props.props.alt" :object-fit="props.props.objectFit" :src="props.props.src" />
    </div>
</template>
<style lang="less" scoped>
.img-cpt-wrap {
    width: 100%;
    height: 100%;

    .n-image {
        width: 100%;
        height: 100%;
        ::v-deep(img) {
            width: 100%;
        }
    }
}
</style>