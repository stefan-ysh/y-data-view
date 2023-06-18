<template>
    <n-collapse default-expanded-names="柱状图" accordion v-for="g in groups" v-show="g.category === cate.name">
        <n-collapse-item display-directive="show" :title="g.name" :name="g.name">
            <template v-for="cpt in g.children" :key="cpt.name" :name="cpt.name">
                <n-card size="small" class="cpt-card" v-if="cpt.group === g.name" draggable
                    @dragstart="onDragstart($event, cpt)">
                    <n-image :src="cpt.screenshot" width="50" preview-disabled />
                    <span>{{ cpt.name }}</span>
                </n-card>
            </template>
        </n-collapse-item>
    </n-collapse>
</template>
<script lang="ts" setup>
const { groups } = defineProps({
    groups: {
        type: Array,
        default: () => []
    },
    cate: {
        type: Object,
        default: () => { }
    },

});
const onDragstart = (event, info) => {
    // 记录下鼠标当前点击的坐标
    const startX = event.clientX - event.target.offsetLeft;
    const startY = event.clientY - event.target.offsetTop;
    // 将组件信息存入到dataTransfer中
    event.dataTransfer.setData('cpt-info', JSON.stringify(info));
    event.dataTransfer.setData('start-coor', JSON.stringify({ startX, startY }));

}
</script>
<style lang="less" scoped>
.n-collapse {
    /deep/ &-item {
        &__content-wrapper {
            .n-collapse-item__content-inner {
                width: 300px;
                display: flex;
                justify-content: space-between;

                .n-card {
                    width: 90px;
                    height: 90px;
                    cursor: move;
                    user-select: none;

                    &__content {
                        padding: 0 !important;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                    }


                    &:hover {
                        box-shadow: 2px 1px 2px 0 rgb(89, 160, 208);
                    }
                }
            }
        }
    }
}
</style>