<template>
    <div>
        <SketchRule :thick="thick" :scale="scale" width="100%" height="100%" :startX="startX" :startY="startY"
            :isShowReferLine="isShowReferLine" :isShowRuler="isShowRuler" :shadow="shadow" :lines="lines" :palette="palette"
            :cornerActive="true">
        </SketchRule>
        <div class="cpt-container" @dragover.prevent @drop="onDrop">
            <div v-for="c in cpts" class="cpt-item" :key="c.id" draggable="true" @dragover.prevent :style="{
                position: 'absolute',
                width: c.width + 'px',
                height: c.height + 'px',
                left: c.x + 'px',
                top: c.y + 'px',
                transform: 'rotate(' + c.rotate + 'deg)',
                zIndex: c.z,
                // backgroundColor: 'red'
                border: '1px solid #fff'
            }">
                ({{ c.x }},
                {{ c.y }})
                {{ c.title }}
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { SketchRule } from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
import { ref } from 'vue'

const onDrop = (event: any) => {
    const dataTransfer = JSON.parse(event.dataTransfer.getData('cpt-info'));
    const { startX, startY } = JSON.parse(event.dataTransfer.getData('start-coor'));
    //通过鼠标开始拖拽时候记录下的坐标计算drop时候的准确坐标，避免drop时候鼠标错位
    // const containerX = event.target.offsetLeft
    // const containerY = event.target.offsetTop
    let x = event.clientX - startX / 2 - 260
    let y = event.clientY - startY / 2 - 50
    // 获取当前drop区域的坐标，指定组件位置的范围
    const containerWidth = 800
    const containerHeight = 1080
    // 判断组件是否超出drop区域
    // if (x <= containerX || y <= containerY || x + dataTransfer.width >= containerWidth || y + dataTransfer.height >= containerHeight) {
    //     return
    // }
    const cptWidth = dataTransfer.width || 150
    const cptHeight = dataTransfer.width || 150
    // 如果超出容器的最大或者小于最小，则设置为最大或者最小

    if (x <= 0) {
        x = 0
    } else if (x + cptWidth >= containerWidth) {
        x = containerWidth - cptWidth
    }
    if (y <= 0) {
        y = 0
    } else if (y + cptHeight >= containerHeight) {
        y = containerHeight - cptHeight
    }
    const cpt = {
        id: Date.now(),
        title: dataTransfer.name,
        x,
        y,
        z: 0,
        width: cptWidth,
        height: cptHeight,
        rotate: 0,
        props: {}
    }
    cpts.value.push(cpt)

}

const cpts = ref<any>([])

const palette = {
    // bgColor: 'rgba(225,225,225, 0)',
    // longfgColor: '#BABBBC',
    // shortfgColor: '#C8CDD0',
    // fontColor: '#7D8694',
    // shadowColor: '#E8E8E8',
    // lineColor: '#EB5648',
    // borderColor: '#DADADC',
    // cornerActiveColor: 'rgb(235, 86, 72, 0.6)'
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
<style lang="less">
.center {
    .cpt-container {
        margin: 20px;
        position: relative;
        // inset: 0;
        height: 100%;
        .cpt-item {
            &:hover {
                border-color: red !important;
            }
        }
    }
}

.indicator .value {
    color: var(--n-text-color);
    background-color: transparent;
}

.mb-ruler {

    .h-container .lines,
    .v-container .lines {
        background-color: red;

        line {
            border-width: 100px !important;
        }
    }
}
</style>