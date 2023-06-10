<template>
    <div>
        <n-card draggable="true" class="cpt-list-item">柱状图</n-card>
        <n-card draggable="true" class="cpt-list-item">折线图</n-card>
        <n-card draggable="true" class="cpt-list-item">饼图</n-card>
        <n-card draggable="true" class="cpt-list-item">地图</n-card>
        <n-card draggable="true" class="cpt-list-item">雷达图</n-card>
        <n-card draggable="true" class="cpt-list-item">仪表盘</n-card>
        <n-card draggable="true" class="cpt-list-item">漏斗图</n-card>
        <n-card draggable="true" class="cpt-list-item">词云图</n-card>
    </div>
</template>   
<style scoped lang="less">
.left {
    .cpt-list-item {
        cursor: move;

        &:hover {
            background-color: #f0f0f0;
            color: black;
        }
    }
}
</style>