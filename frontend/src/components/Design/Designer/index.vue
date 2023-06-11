<template>
    <div>
        <SketchRule :thick="thick" :scale="scale" width="100%" height="100%" :startX="startX" :startY="startY"
            :isShowReferLine="isShowReferLine" :isShowRuler="isShowRuler" :shadow="shadow" :lines="lines" :palette="palette"
            :cornerActive="true">
        </SketchRule>
        <div style="padding: 20px;position: absolute;inset: 0;">2</div>
    </div>
</template>   
<script lang="ts" setup>
import { SketchRule } from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
import { ref } from 'vue'
const onDrop = (e: DragEvent) => {
    e.preventDefault();
    console.log(e);
};
const palette = {
    bgColor: 'rgba(225,225,225, 0)',
    longfgColor: '#BABBBC',
    shortfgColor: '#C8CDD0',
    fontColor: '#7D8694',
    shadowColor: '#E8E8E8',
    lineColor: '#EB5648',
    borderColor: '#DADADC',
    cornerActiveColor: 'rgb(235, 86, 72, 0.6)'
}
const startX = ref(0)
const startY = ref(0)
const thick = ref(20)
const isShowRuler = ref(true)
const scale = ref(1)
const shadow = ref(true)
const lines = ref({
    h: [],
    v: []
})
const isShowReferLine = ref(true)
</script>
<style>
.indicator .value {
    color: var(--n-text-color);
    background-color: transparent;
}
</style>