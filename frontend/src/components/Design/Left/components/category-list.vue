<template>
    <n-tabs size="small" placement="left" type="line" animated default-value="图表类">
        <n-tab-pane v-for="c in categories" :name="c.name" :tab="c.name">
            <GroupList :cate="c" :groups="groups" />
        </n-tab-pane>
    </n-tabs>
</template>   
<script lang="ts" setup>
import GroupList from './group-list.vue';
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
        height: 100%;

        // background: red;
        .n-tab-pane {
            height: 100%;

            .n-tabs-nav-scroll-content {
                height: 100%;
            }

            .n-collapse {
                width: 200px;
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