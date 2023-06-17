<template>
    <div class="right-container">
        <div v-for="p in props" :key="p.name">
            <n-grid style="align-items: center;" :x-gap="0" :cols="10" class="config-item" size="large">
                <n-grid-item :span="3">{{ p.title }}</n-grid-item>
                <n-grid-item :span="7">
                    <n-input v-model:value="obj[p.name as keyof MyObj]" v-if="p.setter === 'string'" />
                    <n-select v-model:value="obj[p.name as keyof MyObj]" v-if="p.setter === 'select'" :options="p.options">
                    </n-select>
                    <n-color-picker v-if="p.setter === 'color'" :show-alpha="true"
                        v-model:value="obj[p.name as keyof MyObj]" />
                    <n-switch v-model:value="obj[p.name as keyof MyObj]" v-if="p.setter === 'switch'" />
                    <n-radio-group v-if="p.setter === 'radio'" v-model:value="obj[p.name as keyof MyObj]" :name="p.name"
                        size="medium">
                        <n-radio-button v-for="radio in p.radioOptions" :key="radio.value" :value="radio.value" :disabled="radio.disabled
                            ">
                            {{ radio.label }}
                        </n-radio-button>
                    </n-radio-group>
                    <n-input-number v-if="p.setter === 'number'" v-model:value="obj[p.name as keyof MyObj]" clearable
                        :step="p.step || 1" :max="p.max || 100" :min="p.min || 0" />
                    <n-input v-if="p.setter === 'textarea'" type="textarea" v-model:value="obj[p.name as keyof MyObj]"
                        clearable />
                    <n-checkbox-group v-if="p.setter === 'checkbox'" v-model:value="obj[p.name as keyof MyObj]">
                        <n-space item-style="display: flex;">
                            <n-checkbox v-for="c in p.checkboxOptions" :value="c.value" :label="c.label" />
                        </n-space>
                    </n-checkbox-group>
                    <n-slider v-if="p.setter === 'slider'" v-model:value="obj[p.name as keyof MyObj]" :step="p.step || 1"
                        :max="p.max || 100" :min="p.min || 0" />
                </n-grid-item>
            </n-grid>
        </div>
    </div>
    <!-- <n-button @click="handleConfirm">Confirm</n-button> -->
</template>   
<script lang="ts" setup>
import { ref } from 'vue';
const handleConfirm = () => {
    console.log(obj.value);
}
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
const obj = ref<MyObj>({
    content: '美味的厨师',
    size: '1',
    color: '#803131FF',
    show: false,
    type: '1',
    slider: 1,
    city: ['1'],
    count: 14,
    desc: '说你爱我',
    time: 37

})
const props = ref([
    {
        title: '内容',
        name: 'content',
        defaultValue: '',
        setter: 'string'
    },
    {
        title: '尺寸',
        name: 'size',
        defaultValue: '',
        setter: 'select',
        options: [
            {
                label: '选项12222',
                value: '1'
            },
            {
                label: '选项22233',
                value: '2'
            },
            {
                label: '选项333',
                value: '3'
            },
        ]
    },
    {
        title: '颜色',
        name: 'color',
        defaultValue: '',
        setter: 'color'
    },
    {
        title: '是否显示',
        name: 'show',
        defaultValue: '',
        setter: 'switch'
    },
    {
        title: '选择类型',
        name: 'type',
        defaultValue: '',
        setter: 'radio',
        radioOptions: [
            {
                label: '单选',
                value: '1'
            },
            {
                label: '多选',
                value: '2'
            },
            {
                label: '其他',
                value: '3',
                disabled: true
            },
            {
                label: '刘德华',
                value: '4',
            },
        ]

    },
    {
        title: '选择类型',
        name: 'city',
        defaultValue: [1],
        setter: 'checkbox',
        checkboxOptions: [
            {
                label: '单选',
                value: '1'
            },
            {
                label: '多选',
                value: '2'
            },
            {
                label: '其他',
                value: '3',
                disabled: true
            },
            {
                label: '刘德华',
                value: '4',
            },
        ]

    },
    {
        title: '显示个数',
        name: 'count',
        defaultValue: '',
        setter: 'number',
        step: 1,
        max: 100,
        min: 0
    },
    {
        title: '说明文字',
        name: 'desc',
        defaultValue: '12122',
        setter: 'textarea'
    },
    {
        title: '动画时间',
        name: 'time',
        defaultValue: '50',
        setter: 'slider',
        step: 1,
        max: 100,
        min: 0
    },
])
</script>
<style lang="less" scoped>
.right-container {
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