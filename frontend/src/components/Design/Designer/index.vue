<template>
    <div>
        <SketchRule :thick="thick" :scale="scale" width="100%" height="100%" :startX="startX" :startY="startY"
            :isShowReferLine="isShowReferLine" :isShowRuler="isShowRuler" :shadow="shadow" :lines="lines" :palette="palette"
            :cornerActive="true">
        </SketchRule>
        <div class="cpt-container" @dragover="handleDragover">
            <div v-for="c in cpts" :key="c.id" draggable="true" @dragstart="handleDragStart(c.id)"
                @dragover="handleDragover" :style="{
                    position: 'absolute',
                    width: c.width + 'px',
                    height: c.height + 'px',
                    left: c.x + 'px',
                    top: c.y + 'px',
                    transform: 'rotate(' + c.rotate + 'deg)',
                    zIndex: c.z,
                    backgroundColor: 'red'
                }">
                {{ c.x }}
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { SketchRule } from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
import { ref } from 'vue'

const curDragId = ref(0)
const handleDragStart = (id: number) => {``
    curDragId.value = id
}

const handleDragover = (e: DragEvent) => {
  e.preventDefault();
  console.log(e);
  const curCpt = cpts.value.find((c) => c.id === curDragId.value) as any;
  const x = e.clientX - 200 - curCpt.width / 2;
  const y = e.clientY - 50 - curCpt.height / 2;
  const updatePosition = () => {
    if (x <= 0) {
      curCpt.x = 0;
    } else if (y <= 0) {
      curCpt.y = 0;
    } else if (x + curCpt.width >= window.innerWidth) {
      curCpt.x = window.innerWidth - curCpt.width;
    } else if (y + curCpt.height >= window.innerHeight) {
      curCpt.y = window.innerHeight - curCpt.height;
    } else {
      curCpt.x = x;
      curCpt.y = y;
    }
  };
  requestAnimationFrame(updatePosition);
};

const handleDrop = (e: DragEvent) => {

};

const cpts = ref([
    {
        id: 1,
        title: '1',
        x: 0,
        y: 0,
        z: 0,
        width: 100,
        height: 100,
        rotate: 0,
        props: {}
    },
    {
        id: 2,
        title: '2',
        x: 230,
        y: 200,
        z: 0,
        width: 100,
        height: 100,
        rotate: 0,
        props: {}
    }
])

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