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
  <n-image
    :fallback-src="props.props.fallbackSrc"
    :alt="props.props.alt"
    :object-fit="props.props.objectFit"
    :width="props.props.width"
    :height="props.props.height"
    :src="props.props.src"
  />
</template>
<style></style>