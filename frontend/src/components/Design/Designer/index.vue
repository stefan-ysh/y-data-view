<template>
    <n-layout-content :embedded="true" ref="designer"
        style="display: flex;align-items: center; justify-content: center;position: relative;">
        <SketchRule :thick="thick" :scale="scale" :width="designStore.curBigscreen.width * screenX"
            :height="designStore.curBigscreen.height * screenY" :startX="startX" :startY="startY"
            :isShowReferLine="isShowReferLine" :isShowRuler="isShowRuler" :shadow="shadow" :lines="lines" :palette="palette"
            :cornerActive="true">
        </SketchRule>
        <div class="cpt-container" @dragover.prevent @drop="onDrop" :style="{
            width: designStore.curBigscreen.width + 'px',
            height: designStore.curBigscreen.height + 'px',
            background: designStore.curBigscreen.bgImg ? `url(${designStore.curBigscreen.bgImg})` : designStore.curBigscreen.bgColor,
            backgroundSize: '100% 100%',
            transition: 'transform 0.5s',
            margin: '20px 0 0 20px',
            transform: `scale(${scale})`,
        }" @click.self="() => { designStore.setCurrentComponent(null) }">
            <div class="ghost-mask" v-show="currentComponent" :style="styleObject" @mousedown="moveCptDown($event)"
                @click.stop="null">
                <drag-handle v-for="(handle, index) in handles" @mousedown.stop="handlerDown($event, handle)" :key="index"
                    :class="`drag-handle drag-handle-${handle}`" />
            </div>

            <div v-for="c in cpts" class="cpt-item" :key="c.id" draggable="true"
                @dragover.prevent :style="{
                    position: 'absolute',
                    width: c.width + 'px',
                    height: c.height + 'px',
                    left: c.x + 'px',
                    top: c.y + 'px',
                    transform: 'rotate(' + c.rotate + 'deg)',
                    zIndex: c.z,
                }">
                <div class="cpt-modal" @mousedown="moveCptDown($event, c)" :style="{
                    width: c.width + 'px',
                    height: c.height + 'px',
                    position: 'absolute',
                    inset: 0,
                    transform: 'rotate(' + c.rotate + 'deg)',
                    zIndex: c.z + 2,
                }"></div>
                <component :is="c.componentName" :props="c.props" :styleObj="c.style" />
            </div>
            <div v-if="cpts.length === 0">
                暂无组件，请从左侧拖拽组件到此处进行设计
            </div>
        </div>
        <div class="hide-right-pane-bar-wrao" @click="collapseRightPane">
            <div class="n-layout-toggle-bar">
                <div class="n-layout-toggle-bar__top"></div>
                <div class="n-layout-toggle-bar__bottom"></div>
            </div>
        </div>
    </n-layout-content>
</template>
  
<script lang="ts" setup>
import { SketchRule } from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useDesignStore } from '@/stores/bigscreen/design';
const designStore = useDesignStore();
const cptProps = designStore.componentProps
import { useSettingStore, useBigscreenStore } from "@/stores";
const setting = useSettingStore()
const toggleBarStyle = computed(() => {
    const isDark = setting.theme === 'dark'
    return {
        bgColor: isDark ? 'rgba(64, 64, 67, 1)' : 'rgba(191, 191, 191, 1)',
        hoverBgColor: isDark ? 'rgba(88, 88, 91, 1)' : 'rgba(153, 153, 153, 1)',
        topHoverDeg: designStore.rightPaneCollapsed ? '12deg' : '-12deg',
        bottomHoverDeg: designStore.rightPaneCollapsed ? '-12deg' : '12deg',
    }
})
const collapseRightPane = () => {
    designStore.setRightPaneCollapsed()
}
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
// 监听左侧/右侧面板的折叠状态，折叠时，重新计算画布的宽度
watch([() => designStore.leftPaneCollapsed, () => designStore.rightPaneCollapsed], () => {
    windowResize()
}, {
    deep: true
})
const scale = ref(1)
const designer = ref()
const timeoutId = ref();
function getMousePosition(event: MouseEvent, refElement: HTMLElement) {
    const rect = refElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale.value;
    const y = (event.clientY - rect.top) / scale.value;
    return { x, y };
}

// 手动移动画布上的组件
const moveCptDown = (e: MouseEvent, c?: any) => {
    e.stopPropagation()
    c && designStore.setCurrentComponent(c)
    // 鼠标按下的坐标
    const { x, y } = getMousePosition(e, designer.value.$el);
    // 组件当前坐标
    const cptStartX = currentComponent.value.x
    const cptStartY = currentComponent.value.y
    // 组件宽高
    const cptWidth = currentComponent.value.width
    const cptHeight = currentComponent.value.height
    // 解决 mousemove mouseup 和 click 事件的冲突
    designer.value.$el.style.pointerEvents = 'none'

    // 将鼠标的坐标实时赋值给 currentComponent
    document.onmousemove = (event: MouseEvent) => {
        event.stopPropagation()
        // 鼠标移动的坐标
        const relativePosition = getMousePosition(event, designer.value.$el);
        // 鼠标移动的距离
        const deltaX = relativePosition.x - x
        const deltaY = relativePosition.y - y
        // 组件移动后的坐标
        const newX = deltaX + cptStartX
        const newY = deltaY + cptStartY
        // 边界检测
        if (newX <= 0) {
            currentComponent.value.x = 0
        } else if (newX + cptWidth >= designStore.curBigscreen.width) {
            currentComponent.value.x = designStore.curBigscreen.width - currentComponent.value.width
        } else {
            currentComponent.value.x = newX;
        }
        if (newY <= 0) {
            currentComponent.value.y = 0
        } else if (newY + cptHeight >= designStore.curBigscreen.height) {
            currentComponent.value.y = designStore.curBigscreen.height - currentComponent.value.height
        } else {
            currentComponent.value.y = newY;
        }

    };

    document.onmouseup = () => {
        // 移除事件及恢复解决 mousedown mouseup 和 click 事件的冲突时设置的 pointerEvents
        designer.value.$el.style.pointerEvents = document.onmousemove = document.onmouseup = null
    }

}
// 防抖
const debounce = (func: Function, delay: number = 300) => {
    clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(func, delay);
}

onMounted(() => {
    windowResize()
    window.addEventListener('resize', windowResize)
})
onUnmounted(() => {
    window.removeEventListener('resize', windowResize)
})
const screenX = ref(0)
const screenY = ref(0)
const windowResize = () => {
    debounce(() => {
        // 处理窗口大小改变事件的代码
        // const canvas = document.querySelector('.cpt-container') as any
        const windowWidth = designer.value.$el.clientWidth - 35
        const windowHeight = designer.value.$el.clientHeight
        const width = designStore.curBigscreen.width
        const height = designStore.curBigscreen.height
        screenX.value = Number((windowWidth / width).toFixed(2))
        screenY.value = Number((windowHeight / height).toFixed(2))
        const minScale = Math.min(screenX.value, screenY.value)
        // 设置缩放最小值，避免缩放过小页面卡死
        scale.value = minScale
    }, 300);

}
const handlerDown = (event: MouseEvent, direction: string) => {
    event.stopPropagation()
    // 记录初始鼠标位置和元素大小
    const startX = event.clientX / scale.value
    const startY = event.clientY / scale.value
    // 记录元素初始大小
    const initWidth = currentComponent.value.width
    // 记录元素初始大小
    const initHeight = currentComponent.value.height
    // 记录元素初始位置-x
    const initX = currentComponent.value.x
    // 记录元素初始位置-y
    const initY = currentComponent.value.y
    // 限制元素最小尺寸
    const MIN_SIZE = 20
    // 添加鼠标移动事件处理程序
    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', stopResize)

    function handleResize(event: MouseEvent) {
        // 计算鼠标移动距离并更新元素大小
        const deltaX = event.clientX / scale.value - startX
        const deltaY = event.clientY / scale.value - startY

        switch (direction) {
            case 't':

                if (initY + deltaY <= 0) {
                    currentComponent.value.y = 0
                } else {
                    if (initHeight - deltaY > MIN_SIZE) {
                        currentComponent.value.y = initY + deltaY
                        currentComponent.value.height = initHeight - deltaY
                    }
                }

                break
            case 'b':
                if (initY + deltaY + initHeight >= designStore.curBigscreen.height) {
                    currentComponent.value.height = designStore.curBigscreen.height - initY
                } else {
                    if (initHeight + deltaY > MIN_SIZE) {
                        currentComponent.value.height = initHeight + deltaY
                    }
                }
                break
            case 'l':
                if (initX + deltaX <= 0) {
                    currentComponent.value.x = 0
                } else {
                    if (initWidth - deltaX > MIN_SIZE) {
                        currentComponent.value.width = initWidth - deltaX
                        currentComponent.value.x = initX + deltaX
                    }
                }

                break
            case 'r':
                if (initX + deltaX + initWidth >= designStore.curBigscreen.width) {
                    currentComponent.value.width = designStore.curBigscreen.width - initX
                } else {
                    if (initWidth + deltaX > MIN_SIZE) {
                        currentComponent.value.width = initWidth + deltaX
                    }
                }
                break
            case 'tl':
                if (initX + deltaX <= 0) {
                    currentComponent.value.x = 0
                } else if (initWidth - deltaX > MIN_SIZE) {
                    currentComponent.value.width = initWidth - deltaX
                    currentComponent.value.x = initX + deltaX
                }
                if (initY + deltaY <= 0) {
                    currentComponent.value.y = 0
                } else if (initHeight - deltaY > MIN_SIZE) {
                    currentComponent.value.height = initHeight - deltaY
                    currentComponent.value.y = initY + deltaY
                }

                break
            case 'tr':
                if (initX + deltaX + initWidth >= designStore.curBigscreen.width) {
                    currentComponent.value.width = designStore.curBigscreen.width - initX
                } else if (initWidth + deltaX > MIN_SIZE) {
                    currentComponent.value.width = initWidth + deltaX
                }
                if (initY + deltaY <= 0) {
                    currentComponent.value.y = 0
                } else if (initHeight - deltaY > MIN_SIZE) {
                    currentComponent.value.height = initHeight - deltaY
                    currentComponent.value.y = initY + deltaY
                }

                break
            case 'bl':
                if (initX + deltaX <= 0) {
                    currentComponent.value.x = 0
                } else if (initWidth - deltaX > MIN_SIZE) {
                    currentComponent.value.width = initWidth - deltaX
                    currentComponent.value.x = initX + deltaX
                }
                if (initY + deltaY + initHeight >= designStore.curBigscreen.height) {
                    currentComponent.value.height = designStore.curBigscreen.height - initY
                } else if (initHeight + deltaY > MIN_SIZE) {
                    currentComponent.value.height = initHeight + deltaY
                }

                break
            case 'br':
                if (initX + deltaX + initWidth >= designStore.curBigscreen.width) {
                    currentComponent.value.width = designStore.curBigscreen.width - initX
                } else if (initWidth + deltaX > MIN_SIZE) {
                    currentComponent.value.width = initWidth + deltaX
                }
                if (initY + deltaY + initHeight >= designStore.curBigscreen.height) {
                    currentComponent.value.height = designStore.curBigscreen.height - initY
                } else if (initHeight + deltaY > MIN_SIZE) {
                    currentComponent.value.height = initHeight + deltaY
                }
                break
        }
    }

    function stopResize(event: MouseEvent) {
        // 移除事件处理程序
        document.removeEventListener('mousemove', handleResize)
        document.removeEventListener('mouseup', stopResize)
    }
}

const onDrop = (event: any) => {
    const relativePosition = getMousePosition(event, designer.value.$el);
    const dataTransfer = JSON.parse(event.dataTransfer.getData('cpt-info'));
    // 获取当前drop区域的坐标，指定组件位置的范围
    const containerWidth = designStore.curBigscreen.width
    const containerHeight = designStore.curBigscreen.height
    // 判断组件是否超出drop区域
    // if (x <= containerX || y <= containerY || x + dataTransfer.width >= containerWidth || y + dataTransfer.height >= containerHeight) {
    //     return
    // }
    const cptWidth = dataTransfer.width || 150
    const cptHeight = dataTransfer.width || 150

    let x = relativePosition.x - 43 - (cptWidth) / 2

    let y = relativePosition.y - 27 - (cptHeight) / 2
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
    debugger
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
const rulerScale = ref(1)
const shadow = ref(true)
const lines = ref({
    h: [],
    v: []
})
const isShowReferLine = ref(true)
</script>
<style lang="less" scoped>
.center {
    ::v-deep(.n-layout-scroll-container) {
        width: 100%;
    }

    .cpt-container {
        margin: 20px;
        min-width: 200px;
        position: relative;
        // inset: 0;
        height: 100%;
        background-size: 100% 100%;
        transform-origin: 0 0;

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
                border-radius: 10px;
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
<style lang="less">
.indicator .value {
    color: var(--n-text-color);
    background-color: transparent;

}

.hide-right-pane-bar-wrao {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);

    .n-layout-toggle-bar {
        cursor: pointer;
        height: 72px;
        width: 32px;
        position: absolute;
        top: calc(50% - 36px);
        right: -10px;

        &__top {
            cursor: pointer;
            background-color: v-bind('toggleBarStyle.bgColor');
            position: absolute;
            width: 4px;
            border-radius: 2px;
            height: 38px;
            left: 14px;
            transition: background-color .3s var(--n-bezier), transform .3s var(--n-bezier);
        }

        &__bottom {
            cursor: pointer;
            background-color: v-bind('toggleBarStyle.bgColor');
            position: absolute;
            width: 4px;
            border-radius: 2px;
            height: 38px;
            left: 14px;
            top: 34px;
            transition: background-color .3s var(--n-bezier), transform .3s var(--n-bezier);
        }

        &:hover {
            .n-layout-toggle-bar__top {
                transform: rotate(v-bind('toggleBarStyle.topHoverDeg')) scale(1.15) translateY(-2px);
                background-color: v-bind('toggleBarStyle.hoverBgColor');
            }

            .n-layout-toggle-bar__bottom {
                transform: rotate(v-bind('toggleBarStyle.bottomHoverDeg')) scale(1.15) translateY(2px);
                background-color: v-bind('toggleBarStyle.hoverBgColor');

            }
        }
    }
}
</style>