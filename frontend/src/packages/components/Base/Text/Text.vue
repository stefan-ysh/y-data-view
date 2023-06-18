<script setup lang="ts">
const props = defineProps({
    props: {
        type: Object,
        default: () => {
            return {}
        }
    },
    styleObj: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
const convertStyleObj2InlineStyle = (styleObj: any) => {
    let styleStr = '';
    for (const key in styleObj) {
        const addPxSuffix = ['width', 'height', 'top', 'left', 'right', 'bottom', 'fontSize', 'lineHeight', 'borderWidth', 'borderRadius', 'padding', 'margin'];
        if (addPxSuffix.includes(key)) {
            styleStr += `${camelToKebab(key)}: ${styleObj[key]}px;`
            continue;
        }
        styleStr += `${camelToKebab(key)}: ${styleObj[key]};`
    }
    return styleStr;
}
</script>

<template>
    <div :style="convertStyleObj2InlineStyle(props.styleObj)" style="width: 100%; height: 100%;box-sizing: border-box;">
        {{ props.props.content }}
    </div>
</template>
<style></style>