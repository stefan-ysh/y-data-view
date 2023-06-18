<template>
    <div v-for="p in [...curProps]" :key="p.name">
        <n-grid style="align-items: center;" :x-gap="0" :cols="10" class="config-item" size="large"
            v-if="!p.hasOwnProperty('condition') || p.condition(props.currentCpt)">
            <n-grid-item :span="2">{{ p.title }}</n-grid-item>
            <n-grid-item :span="8">
                <n-input @input="changeIpt($event, p.type, p.name)" v-model:value="props.currentCpt[p.type][p.name]"
                    v-if="p.setter.name === 'string'" />
                <n-select @update:value="handleSelect($event, p.type, p.name)" v-model:value="props.currentCpt[p.type][p.name]"
                    v-if="p.setter.name === 'select'" :options="p.setter.options">
                </n-select>
                <n-color-picker @update:value="handleChangeColor($event, p.type, p.name)" v-if="p.setter.name === 'color'"
                    :show-alpha="true" v-model:value="props.currentCpt[p.type][p.name]" />
                <n-switch @update:value="handleChangeSwitch($event, p.type, p.name)"
                    v-model:value="props.currentCpt[p.type][p.name]" v-if="p.setter.name === 'boolean'" />
                <n-radio-group v-if="p.setter.name === 'radio'" v-model:value="props.currentCpt[p.type][p.name]" :name="p.name"
                    size="medium">
                    <n-radio-button v-for="radio in p.setter.radioOptions" :key="radio.value" :value="radio.value"
                        :disabled="radio.disabled">
                        {{ radio.label }}
                    </n-radio-button>
                </n-radio-group>
                <n-input-number @update:value="handleChangeNumber($event, p.type, p.name)" v-if="p.setter.name === 'number'"
                    v-model:value="props.currentCpt[p.type][p.name]" clearable :step="p.setter.step || 1"
                    :max="p.setter.max || 100" :min="p.setter.min || 0" />
                <n-input v-if="p.setter.name === 'textarea'" type="textarea" v-model:value="props.currentCpt[p.type][p.name]"
                    clearable />
                <n-checkbox-group v-if="p.setter.name === 'checkbox'" v-model:value="props.currentCpt[p.type][p.name]">
                    <n-space item-style="display: flex;">
                        <n-checkbox v-for="c in p.setter.checkboxOptions" :value="c.value" :label="c.label" />
                    </n-space>
                </n-checkbox-group>
                <n-slider v-if="p.setter.name === 'slider'" v-model:value="props.currentCpt[p.type][p.name]"
                    :step="p.setter.step || 1" :max="p.setter.max || 100" :min="p.setter.min || 0" />
            </n-grid-item>
        </n-grid>
    </div>
</template>
<script lang="ts" setup>
import { useDesignStore } from '@/stores/bigscreen/design';
const designStore = useDesignStore();
import { computed, ref, watch } from 'vue';
const cptProps = designStore.componentProps;

// ? 结构将会失去响应式
const props = defineProps({
    currentCpt: {
        type: Object,
        required: true
    }
});

const curProps = ref(<any>[])

watch(
    () => props.currentCpt,
    (val) => {
        curProps.value = [...cptProps[val.code].props, ...cptProps[val.code].style]
    },
    {
        immediate: true,
        deep: true
    }
);
const changeIpt = (val: any, type: string, name: string) => {
    props.currentCpt[type][name] = val
};
const handleSelect = (val: any, type: string, name: string) => {
    props.currentCpt[type][name] = val
};
const handleChangeSwitch = (val: any, type: string, name: string) => {
    props.currentCpt[type][name] = val
};
const handleChangeNumber = (val: any, type: string, name: string) => {
    props.currentCpt[type][name] = val
};
const handleChangeColor = (val: any, type: string, name: string) => {
    props.currentCpt[type][name] = val
};
</script>
<style lang="less" scoped>
.config-item {
    margin-top: 10px;

    .n-radio-group {
        &.n-radio-group--button-group {
            // 
            white-space: normal !important;
        }
    }
}
</style>