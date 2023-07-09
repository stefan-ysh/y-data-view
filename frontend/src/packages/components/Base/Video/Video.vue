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
        <video class="video-cpt-wrap" height="20px" :poster="props.props.poster" :autoplay="props.props.autoplay"
            width="100%" :loop="props.props.loop" :controls="props.props.controls" :muted="props.props.muted"
            :style="styleObj">
            <source ref="videoSource" :src="props.props.src" type="video/mp4">
        </video>
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