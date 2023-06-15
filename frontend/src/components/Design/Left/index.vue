<template>
    <div style="display: flex;">
        <n-tabs size="small" class="card-tabs" default-value="cpt" type="line"  justify-content="space-evenly" animated pane-wrapper-style="margin: 0 -4px">
            <n-tab-pane name="cpt" tab="组件" style="display: flex;">
                <CategoryList :categories="categories" :groups="groups" />
            </n-tab-pane>
            <n-tab-pane name="layer" tab="图层">
                <Layer />
            </n-tab-pane>
        </n-tabs>
    </div>
</template>   
<script lang="ts" setup>
import { onMounted, ref, h } from 'vue';
import CategoryList from './components/category-list.vue';
import Layer from './components/layer.vue';
import { useBigscreenStore } from '@/stores'
const bigscreenStore = useBigscreenStore();
function transformData(data) {
    const categories = {};
    const groups = {};

    // Group the snippet data by category and group
    data.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        if (!groups[item.group]) {
            groups[item.group] = {
                name: item.group,
                category: item.category
            };
            categories[item.category].push(groups[item.group]);
        }
    });

    // Convert the grouped data to the desired format
    const categoryData = Object.keys(categories).map(category => ({
        name: category,
        type: "cate"
    }));

    const childrenData = data.map(item => ({
        name: item.name,
        group: item.group,
        category: item.category,
        ...item,
        type: "cpt"
    }));
    const groupData = Object.values(groups).map(group => ({
        name: group.name,
        category: group.category,
        type: "group",
        children: childrenData.filter((c => { return c.group === group.name}))
    }));
    return {
        category: categoryData,
        group: groupData,
        children: childrenData
    };
}
const categories = ref(<any>[]);
const groups = ref(<any>[]);
// const cpts = ref(<any>[]);
onMounted(() => {
    const snippet1 = bigscreenStore.leftPaneList;
    const { category, group, children } = transformData(snippet1);
    categories.value = category;
    groups.value = group;
});

const handlerSelectCate = (value: string) => {
    // groups.value = snippet1.filter(item => item.category === value);
}

</script>
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
<!-- <style lang="less">
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
                            // width: 100%;
                            // display: flex;
                            // justify-content: space-between;

                        }
                    }
                }
            }
        }
    }
}
</style> -->