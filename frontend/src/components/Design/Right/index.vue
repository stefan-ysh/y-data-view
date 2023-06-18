<template>
    <div class="right-container" v-if="currentCpt">
        <div v-for="p in [...curProps]" :key="p.name">
            <n-grid style="align-items: center;" :x-gap="0" :cols="10" class="config-item" size="large"
                v-if="!p.hasOwnProperty('condition') || p.condition(currentCpt)">
                <n-grid-item :span="2">{{ p.title }}</n-grid-item>
                <n-grid-item :span="8">
                    <n-input @input="changeIpt($event, p.type, p.name)" v-model:value="currentCpt[p.type][p.name as keyof MyObj]" v-if="p.setter.name === 'string'" />
                    <n-select @update:value="handleSelect($event, p.type, p.name)" v-model:value="currentCpt[p.type][p.name as keyof MyObj]" v-if="p.setter.name === 'select'" :options="p.setter.options">
                    </n-select>
                    <n-color-picker @update:value="handleChangeColor($event, p.type, p.name)" v-if="p.setter.name === 'color'" :show-alpha="true"
                        v-model:value="currentCpt[p.type][p.name as keyof MyObj]" />
                    <n-switch @update:value="handleChangeSwitch($event, p.type, p.name)"  v-model:value="currentCpt[p.type][p.name as keyof MyObj]" v-if="p.setter.name === 'boolean'" />
                    <n-radio-group v-if="p.setter.name === 'radio'" v-model:value="currentCpt[p.type][p.name as keyof MyObj]" :name="p.name"
                        size="medium">
                        <n-radio-button v-for="radio in p.setter.radioOptions" :key="radio.value" :value="radio.value"
                            :disabled="radio.disabled">
                            {{ radio.label }}
                        </n-radio-button>
                    </n-radio-group>
                    <n-input-number @update:value="handleChangeNumber($event, p.type, p.name)" v-if="p.setter.name === 'number'" v-model:value="currentCpt[p.type][p.name as keyof MyObj]" clearable
                        :step="p.setter.step || 1" :max="p.setter.max || 100" :min="p.setter.min || 0" />
                    <n-input v-if="p.setter.name === 'textarea'" type="textarea" v-model:value="currentCpt[p.type][p.name as keyof MyObj]"
                        clearable />
                    <n-checkbox-group v-if="p.setter.name === 'checkbox'" v-model:value="currentCpt[p.type][p.name as keyof MyObj]">
                        <n-space item-style="display: flex;">
                            <n-checkbox v-for="c in p.setter.checkboxOptions" :value="c.value" :label="c.label" />
                        </n-space>
                    </n-checkbox-group>
                    <n-slider v-if="p.setter.name === 'slider'" v-model:value="currentCpt[p.type][p.name as keyof MyObj]" :step="p.setter.step || 1"
                        :max="p.setter.max || 100" :min="p.setter.min || 0" />
                </n-grid-item>
            </n-grid>
        </div>
    </div>
</template>   
<script lang="ts" setup>
import { useBigscreenStore } from '@/stores/bigscreen/bigscreen';
import { useDesignStore } from '@/stores/bigscreen/design';
const designStore = useDesignStore();
import { computed } from 'vue';
const cptProps = designStore.componentProps;

const currentCpt = computed(() => {
    return designStore.currentComponent;
});
const curProps = computed(() => {
    return [...cptProps[currentCpt.value.code].props, ...cptProps[currentCpt.value.code].style];
});

type MyObj = {
    content: string;
    size: string;
    color: string;
    show: boolean;
    type: string;
    slider: number;
    city: string[];
    count: number;
    desc: string;
    time: number;
};
const changeIpt = (e: any, type, name: string) => {
    currentCpt.value[type][name as keyof MyObj] = e
};
const handleSelect = (val, type, name) => {
    currentCpt.value[type][name as keyof MyObj] = val
};
const handleChangeSwitch = (val, type, name) => {
    currentCpt.value[type][name as keyof MyObj] = val
};
const handleChangeNumber = (val, type, name) => {
    currentCpt.value[type][name as keyof MyObj] = val
};
const handleChangeColor = (val, type, name) => {
    currentCpt.value[type][name as keyof MyObj] = val
};
// const currentCpt = ref<MyObj>({
//     content: '美味的厨师',
//     size: '1',
//     color: '#803131FF',
//     show: false,
//     type: '1',
//     slider: 1,
//     city: ['1'],
//     count: 14,
//     desc: '说你爱我',
//     time: 37

// })
// type Prop = {
//     title: string;
//     name: string;
//     defaultValue: string | boolean | number | string[];
//     setter: 'string' | 'select' | 'color' | 'switch' | 'radio' | 'number' | 'textarea' | 'checkbox' | 'slider';
//     condition?: (target: any) => boolean;
//     options?: {
//         label: string;
//         value: string;
//     }[];
//     radioOptions?: {
//         label: string;
//         value: string;
//         disabled?: boolean;
//     }[];
//     checkboxOptions?: {
//         label: string;
//         value: string;
//     }[];
//     step?: number;
//     max?: number;
//     min?: number;

// }
// const props = ref(<Prop[]>[
//     {
//         title: '内容',
//         name: 'content',
//         defaultValue: '',
//         setter: 'string',
//         condition: () => { return true }
//     },
//     {
//         title: '尺寸',
//         name: 'size',
//         defaultValue: '',
//         setter: 'select',
//         condition: (target: any) => {
//             return target.content === 'size'
//         },
//         options: [
//             {
//                 label: '选项12222',
//                 value: '1'
//             },
//             {
//                 label: '选项22233',
//                 value: '2'
//             },
//             {
//                 label: '选项333',
//                 value: '3'
//             },
//         ]
//     },
//     {
//         title: '颜色',
//         name: 'color',
//         defaultValue: '',
//         setter: 'color',
//         condition: () => { return true }

//     },
//     {
//         title: '是否显示',
//         name: 'show',
//         defaultValue: '',
//         setter: 'switch',
//         condition: () => { return true }

//     },
//     {
//         title: '选择类型',
//         name: 'type',
//         defaultValue: '',
//         setter: 'radio',
//         condition: () => { return true }
//         ,
//         radioOptions: [
//             {
//                 label: '单选',
//                 value: '1'
//             },
//             {
//                 label: '多选',
//                 value: '2'
//             },
//             {
//                 label: '其他',
//                 value: '3',
//                 disabled: true
//             },
//             {
//                 label: '刘德华',
//                 value: '4',
//             },
//         ]

//     },
//     {
//         title: '选择类型',
//         name: 'city',
//         defaultValue: [1],
//         setter: 'checkbox',
//         condition: () => { return true }
//         ,
//         checkboxOptions: [
//             {
//                 label: '单选',
//                 value: '1'
//             },
//             {
//                 label: '多选',
//                 value: '2'
//             },
//             {
//                 label: '其他',
//                 value: '3',
//                 disabled: true
//             },
//             {
//                 label: '刘德华',
//                 value: '4',
//             },
//         ]

//     },
//     {
//         title: '显示个数',
//         name: 'count',
//         defaultValue: '',
//         setter: 'number',
//         step: 1,
//         condition: () => { return true },
//         max: 100,
//         min: 0
//     },
//     {
//         title: '说明文字',
//         name: 'desc',
//         defaultValue: '12122',
//         setter: 'textarea',
//         condition: () => { return true }

//     },
//     {
//         title: '动画时间',
//         name: 'time',
//         defaultValue: '50',
//         setter: 'slider',
//         step: 1,
//         max: 100,
//         min: 0,
//         condition: () => { return true }

//     },
// ])
</script>
<style lang="less" scoped>
.right-container {
    width: 400px;
    min-width: 400px;
    max-width: 400px;
    padding: 0 5px;
    background: var(--n-color);

    .config-item {
        margin-top: 10px;

        .n-radio-group {
            &.n-radio-group--button-group {
                // 
                white-space: normal !important;
            }
        }
    }
}
</style>