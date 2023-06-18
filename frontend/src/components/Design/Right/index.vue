<template>
    <div class="right-container">
        <BigscreenConfig :bigscreenInfo="bigscreenInfo" v-if="!currentCpt" />
        <CptConfig :currentCpt="currentCpt" v-else />
    </div>
</template>   
<script lang="ts" setup>
import CptConfig from './cpt-config.vue';
import BigscreenConfig from './bigscreen-config.vue';
import { useDesignStore } from '@/stores/bigscreen/design';
const designStore = useDesignStore();
import { computed } from 'vue';

const currentCpt = computed(() => {
    return designStore.currentComponent;
});

const bigscreenInfo = computed(() => {
    return designStore.curBigscreen;
});

</script>
<style lang="less">
.right-container {
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    padding: 0 5px;
    background: var(--n-color);
}
</style>