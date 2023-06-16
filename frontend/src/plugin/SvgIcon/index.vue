<script setup lang="ts">
import {computed} from 'vue';
interface Props {
  iconClass: string
  color?: string
  size?: string
}
const props = withDefaults(defineProps<Props>(), {
  iconClass: '',
  color: '#000',
  size: '16px',
})
const iconName = computed(() => `#icon-${props.iconClass}`)
</script>
 
<template>
  <svg class="c-icon" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>
 
<style scoped lang="less">
.c-icon {
  width: v-bind(size);
  height: v-bind(size);
  position: relative;
}
</style>
