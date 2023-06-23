<template>
    <n-layout class="left" has-sider sider-placement="left">
        <n-layout-sider collapse-mode="transform" :collapsed-width="0" :width="300" :native-scrollbar="false"
        :on-update:collapsed="designStore.setLeftPaneCollapsed"
            show-trigger="bar" content-style="padding: 0px;" bordered>
            <n-tabs size="small" :on-update:value="changeTab" class="card-tabs" default-value="cpt" type="line"
                justify-content="space-evenly" animated pane-wrapper-style="margin: 0 -4px">
                <n-tab-pane display-directive="show" v-for="t in tabs" :key="t" :tab="t.label" :name="t.name">
                    <keep-alive>
                        <component :is="curCpt" :categories="categories" :groups="groups" />
                    </keep-alive>
                </n-tab-pane>
            </n-tabs>
        </n-layout-sider>
        <n-layout-content>
            <Designer class="center" />
        </n-layout-content>
    </n-layout>
</template>   
<script lang="ts" setup>
import { onMounted, ref, markRaw } from 'vue';
import CategoryList from './components/category-list.vue';
import Layer from './components/layer.vue';
import { useDesignStore } from '@/stores/bigscreen/design';
import Designer from '@/components/Design/Designer/index.vue'
const designStore = useDesignStore();
const tabs = [
    { name: 'cpt', label: '组件' },
    { name: 'layer', label: '图层' },
]
const curCpt = ref(markRaw(CategoryList));
const tabCpts = [
    CategoryList,
    Layer
]
const changeTab = (tab: string) => {
    const index = tab === 'cpt' ? 0 : 1
    const _cpt = tabCpts[index]
    curCpt.value = markRaw(_cpt);
};
function transformData(data: any) {
    const categories: any = {};
    const groups: any = {};

    // Group the snippet data by category and group
    data.forEach((item: any) => {
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

    const childrenData = data.map((item: any) => ({
        name: item.name,
        group: item.group,
        category: item.category,
        ...item,
        type: "cpt"
    }));
    const groupData = Object.values(groups).map((group: any) => ({
        name: group.name,
        category: group.category,
        type: "group",
        children: childrenData.filter(((c: any) => { return c.group === group.name }))
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
    const snippets = designStore.leftPaneList.map((item: any) => {
        return item
    });
    const { category, group, children } = transformData(snippets);
    categories.value = category;
    groups.value = group;
});

const handlerSelectCate = (value: string) => {
    // groups.value = snippets.filter(item => item.category === value);
}

</script>
<style scoped lang="less">
.left {
    .n-layout-scroll-container {
        .n-layout-sider {
            z-index: 4;
            height: 100%;

            ::v-deep(.n-scrollbar) {
                .n-scrollbar-container {
                    .n-scrollbar-content {
                        height: 100%;
                        // 顶部组件/图层切换

                        .n-tabs {

                            // .n-tabs-pane-wrapper {
                            // .n-tab-pane {
                            .n-tabs {

                                // 左侧分类
                                .n-tabs-nav--line-type {
                                    width: 81px;
                                }
                            }

                            // }
                            // }
                        }
                    }
                }

            }
        }

    }

}
</style>
<style lang="less">
.card-tabs {
    height: 100%;

    .n-tabs-pane-wrapper {
        .n-tab-pane {
            .n-collapse {

                .n-collapse-item {

                    // display: flex;
                    .n-collapse-item__content-wrapper {
                        .n-collapse-item__content-inner {
                            width: 200px;
                            display: flex;
                            justify-content: space-around;

                        }
                    }
                }
            }
        }
    }
}
</style>
<style>
.center {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: linear-gradient(var(--n-color) 14px, transparent 0), linear-gradient(90deg, transparent 14px, var(--n-text-color) 0);
    background-size: 15px 15px;
}
</style>