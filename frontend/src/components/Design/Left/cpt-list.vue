<template>
    <n-tabs size="small" placement="left" type="line" animated default-value="图表类">
        <n-tab-pane v-for="c in categories" :name="c.name" :tab="c.name">
            <n-collapse default-expanded-names="柱状图" accordion v-for="g in groups" v-show="g.category === c.name">
                <n-collapse-item :title="g.name" :name="g.name">
                    <template v-for="cpt in cpts" :key="cpt.name" :name="cpt.name">
                        <n-card v-if="cpt.group === g.name">
                            {{ cpt.name }}
                        </n-card>
                    </template>
                </n-collapse-item>
            </n-collapse>
        </n-tab-pane>
    </n-tabs>
</template>   
<script lang="ts" setup>
const { categories } = defineProps({
    categories: {
        type: Array,
        default: () => []
    },
    groups: {
        type: Array,
        default: () => []
    },
});
</script>
<style lang="less">
.card-tabs {
    .n-tabs-pane-wrapper {

        // background: red;
        .n-tab-pane {
            .n-collapse {
                display: flex;

                .n-collapse-item {

                    // display: flex;
                    .n-collapse-item__content-wrapper {
                        .n-collapse-item__content-inner {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;

                        }
                    }
                }
            }
        }
    }
}
</style>