<template>
    <div>图层</div>
</template>   
<script lang="ts" setup>
defineProps({
    categories: {
        type: Array,
        default: () => []
    },
    groups: {
        type: Array,
        default: () => []
    },
});
</script>