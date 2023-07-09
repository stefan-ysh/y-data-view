<script setup lang="ts">
import { ref, watch } from 'vue'
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
    <div class="video-cpt-wrap">
        <n-carousel class="video-cpt-wrap" :dot-type="props.props.dotType" :trigger="props.props.trigger"
            :loop="props.props.loop" :dot-placement="props.props.dotPlacement" :direction="props.props.direction"
            :interval="props.props.interval * 1000" :effect="props.props.effect" :autoplay="props.props.autoplay"
            :draggable="props.props.draggable" :show-arrow="props.props.showArrow" :show-dots="props.props.showDots"
            :style="styleObj">
            <img style="width: 100%; height: 100%" v-for="item in props.props.imgList" :key="item" :src="item" />
        </n-carousel>
    </div>
</template>
<style lang="less" scoped>
.video-cpt-wrap {
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