<template>
    <n-layout-content :embedded="true">
        <SketchRule :thick="thick" :scale="scale" width="100%" height="100%" :startX="startX" :startY="startY"
            :isShowReferLine="isShowReferLine" :isShowRuler="isShowRuler" :shadow="shadow" :lines="lines" :palette="palette"
            :cornerActive="true">
        </SketchRule>
        <div class="cpt-container" @dragover.prevent @drop="onDrop"
            @click="() => { designStore.setCurrentComponent(null) }">
            <div class="ghost-mask" v-show="currentComponent" :style="styleObject">
                <drag-handle v-for="(handle, index) in handles" @mousedown.stop="handlerDown($event, handle)" :key="index"
                    :class="`drag-handle drag-handle-${handle}`" />
            </div>

            <div v-for="c in cpts" class="cpt-item" @click.stop="clickCptItem(c)" :key="c.id" draggable="true"
                @dragover.prevent :style="{
                    position: 'absolute',
                    width: c.width + 'px',
                    height: c.height + 'px',
                    left: c.x + 'px',
                    top: c.y + 'px',
                    transform: 'rotate(' + c.rotate + 'deg)',
                    zIndex: c.z,
                }">
                <div class="cpt-modal" :style="{
                    width: c.width + 'px',
                    height: c.height + 'px',
                    position: 'absolute',
                    inset: 0,
                    transform: 'rotate(' + c.rotate + 'deg)',
                    zIndex: c.z + 2,
                }"></div>
                <component :is="c.componentName" :props="c.props" :styleObj="c.style" />
            </div>
        </div>
    </n-layout-content>
</template>
  
<script lang="ts" setup>
import { SketchRule } from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
import { computed, ref } from 'vue'
import { useDesignStore } from '@/stores/bigscreen/design';
const designStore = useDesignStore();
const cptProps = designStore.componentProps
function arrayToObject(arr) {
    return arr.reduce((obj, item) => {
        obj[item.name] = item.defaultValue;
        return obj;
    }, {});
}
const handles = ["t", "b", "l", "r", "tl", "tr", "bl", "br", "rotate"];
const currentComponent = computed(() => {
    return designStore.currentComponent
})
const styleObject = computed(() => {
    if (currentComponent.value) {
        const { width, height, x, y, z } = currentComponent.value;
        return {
            width: `${width}px`,
            height: `${height}px`,
            left: `${x}px`,
            top: `${y}px`,
            zIndex: z + 1,
        };
    } else {
        return {}
    }

})
const handlerDown = (event: MouseEvent, direction: string) => {
    // 记录初始鼠标位置和元素大小
    const startX = event.clientX
    const startY = event.clientY
    const startWidth = currentComponent.value.width
    const startHeight = currentComponent.value.height
    const elX = currentComponent.value.x
    const elY = currentComponent.value.y
    // 添加鼠标移动事件处理程序
    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', stopResize)

    function handleResize(event: MouseEvent) {
        event.stopPropagation()
        // 计算鼠标移动距离并更新元素大小
        const deltaX = event.clientX - startX
        const deltaY = event.clientY - startY
        switch (direction) {
            case 't':
                currentComponent.value.height = startHeight - deltaY
                currentComponent.value.y = elY + deltaY
                break
            case 'b':
                currentComponent.value.height = startHeight + deltaY
                break
            case 'l':
                currentComponent.value.width = startWidth - deltaX
                currentComponent.value.x = elX + deltaX
                break
            case 'r':
                currentComponent.value.width = startWidth + deltaX
                break
            case 'tl':
                currentComponent.value.height = startHeight - deltaY
                currentComponent.value.y = elY + deltaY
                currentComponent.value.width = startWidth - deltaX
                currentComponent.value.x = elX + deltaX
                break
            case 'tr':
                currentComponent.value.height = startHeight - deltaY
                currentComponent.value.y = elY + deltaY
                currentComponent.value.width = startWidth + deltaX
                currentComponent.value.x = elX
                break
            case 'bl':
                currentComponent.value.height = startHeight + deltaY
                currentComponent.value.width = startWidth - deltaX
                currentComponent.value.x = elX + deltaX
                currentComponent.value.y = elY
                break
            case 'br':
                currentComponent.value.height = startHeight + deltaY
                currentComponent.value.width = startWidth + deltaX
                currentComponent.value.x = elX
                currentComponent.value.y = elY
                break
        }
    }

    function stopResize(event: MouseEvent) {
        event.stopPropagation()
        // 移除事件处理程序
        document.removeEventListener('mousemove', handleResize)
        document.removeEventListener('mouseup', stopResize)
    }
}

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

    const { props, style } = cptProps[dataTransfer.code]
    const cpt = {
        id: Date.now(),
        componentName: dataTransfer.componentName,
        title: dataTransfer.name,
        code: dataTransfer.code,
        x,
        y,
        z: 0,
        width: cptWidth,
        height: cptHeight,
        rotate: 0,
        props: {
            ...arrayToObject(props)
        },
        style: {
            ...arrayToObject(style)
        }
    }
    designStore.addComponent(cpt)
}
const clickCptItem = (cpt: any) => {
    designStore.setCurrentComponent(cpt)
}
const cpts = computed(() => {
    return designStore.curBigscreen.components
})

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
<style lang="less" scoped>
.center {
    .cpt-container {
        margin: 20px;
        position: relative;
        // inset: 0;
        height: 100%;


        .ghost-mask {
            position: absolute;
            border: 1px solid red;
            background: rgba(208, 229, 52, 0.109);
            // transition: all 1s;

            // 多方向把手调节宽高坐标等
            .drag-handle {
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #fff;
                border: 1px solid #000;
                cursor: pointer;
            }

            .drag-handle-tl {
                top: -5px;
                left: -5px;
                cursor: nwse-resize;
            }

            .drag-handle-tr {
                top: -5px;
                right: -5px;
                cursor: nesw-resize;
            }

            .drag-handle-bl {
                bottom: -5px;
                left: -5px;
                cursor: nesw-resize;
            }

            .drag-handle-br {
                bottom: -5px;
                right: -5px;
                cursor: nwse-resize;
            }

            .drag-handle-t {
                top: -5px;
                left: 50%;
                transform: translateX(-50%);
                cursor: ns-resize;
            }

            .drag-handle-b {
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                cursor: ns-resize;
            }

            .drag-handle-l {
                top: 50%;
                left: -5px;
                transform: translateY(-50%);
                cursor: ew-resize;
            }

            .drag-handle-r {
                top: 50%;
                right: -5px;
                transform: translateY(-50%);
                cursor: ew-resize;
            }

            .drag-handle-rotate {
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                border-radius: 50%;
                // 旋转
                cursor: pointer;
            }

        }

        .cpt-item {
            .cpt-modal {
                &:hover {
                    border: 1px dashed yellow;
                    border-radius: 5px;
                }
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