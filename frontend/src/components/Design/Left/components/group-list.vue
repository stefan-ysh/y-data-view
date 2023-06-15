<template>
    <n-collapse default-expanded-names="柱状图" accordion v-for="g in groups" v-show="g.category === cate.name">
        <n-collapse-item :title="g.name" :name="g.name">
            <template v-for="cpt in g.children" :key="cpt.name" :name="cpt.name">
                <n-card size="small" class="cpt-card" v-if="cpt.group === g.name">
                    <n-image :src="cpt.screenshot" width="50" />
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
    }
});
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

                    &__content {
                        padding: 0 !important;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>