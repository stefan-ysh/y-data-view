<template>
  <n-layout class="designer-wrap">
    <header style="border-bottom:1px solid red;">
      <div>
        <n-button @click="router.push('/')" style="margin-right: 5px;">
          <n-icon :component="HomeIcon"></n-icon>
        </n-button>
        <span>ID：{{ router.currentRoute.value.query.id }} 名称： {{ title }}</span>
      </div>
      <div>
        <n-radio-group v-model:value="viewType" name="radiobuttongroup1" size="small">
          <n-radio-button v-for="_t in viewTypes" :key="_t.value" :value="_t.value" :label="_t.icon">
            <n-icon :component="_t.icon"></n-icon>
          </n-radio-button>
        </n-radio-group>
      </div>
      <div class="operation-btns" style="display: flex; align-items: center;">
        <n-button @click="setting.changeTheme">
          <n-icon :component="setting.theme === 'light' ? SunnyIcon : MoonIcon"></n-icon>
        </n-button>
        <n-button style="margin-left: 5px;">
          <n-icon>
            <ArrowUndo />
          </n-icon>
        </n-button>
        <n-button style="margin-left: 5px;">
          <n-icon>
            <ArrowRedo />
          </n-icon>
        </n-button>
        <n-button style="margin-left: 5px;">导入</n-button>
        <n-button style="margin-left: 5px;">导出</n-button>
        <n-button style="margin-left: 5px;">清空画布</n-button>
        <n-button style="margin-left: 5px;">预览</n-button>
        <n-button style="margin-left: 5px;">保存</n-button>
      </div>
    </header>
    <n-layout has-sider class="designer-container">
      <Left />
      <!-- <Designer class="center" /> -->
      <Right />
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Left from '@/components/Design/Left/index.vue'
import Right from '@/components/Design/Right/index.vue'
import Designer from '@/components/Design/Designer/index.vue'
import BigscreebApi from '@/api/bigscreen'
import { Icon } from "@vicons/utils";
const { SunnyIcon, MoonIcon, HomeIcon, ArrowRedo, ArrowUndo } = icon.ionicons5;
const { Computer, Mobile } = icon.material;
import { onMounted, ref } from 'vue'
import { useSettingStore } from "@/stores";
import { useDesignStore } from '@/stores/bigscreen/design'
const designStore = useDesignStore()
import { icon } from '@/icon'
const setting = useSettingStore();
const router = useRouter()
const title = ref('')
import { loadModules } from '@/packages'
onMounted(async () => {
  const id = router.currentRoute.value.query.id as string | number
  if (!id) {
    window.$message.error('页面不存在，即将跳转到首页')
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
  const res = await BigscreebApi.getBcDetail(id)
  if (res.code === 200) {
    title.value = res.data.title
    designStore.setCurBigscreen(res.data)
  } else {
    console.log(res)
  }
})
const viewType = ref('PC')

const viewTypes = [
  {
    value: 'PC',
    label: 'PC',
    icon: Computer
  },
  {
    value: 'mobile',
    label: '移动端',
    icon: Mobile
  }
]

loadModules()
</script>
<style scoped lang="less">
.designer-wrap {
  position: absolute;
  inset: 0;

  header {
    height: 50px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .designer-container {
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    // align-items: center;
    width: 100%;
    height: calc(100% - 50px);

    .left {
      // max-width: 260px;
      // min-width: 260px;
      // height: 100%;
      // background-color: rgb(220, 185, 185);
    }

    .center {
      width: 100%;
      height: 100%;
      position: relative;
      // background-color: rgb(84, 84, 134);
      background-image: linear-gradient(var(--n-color) 14px, transparent 0), linear-gradient(90deg, transparent 14px, var(--n-text-color) 0);
      background-size: 15px 15px;
      // border-left: 1px solid red;
      // border-right: 1px solid red;
      // background: linear-gradient(-90deg, var(--n-text-color) 1px, transparent 0px) 0px 0px / 20px 20px, linear-gradient(0deg, var(--n-text-color) 1px, var(--n-color) 0px) 0px 0px / 20px 20px
    }

    .right {
      max-width: 260px;
      min-width: 260px;
      height: 100%;
      padding: 0 5px;
      // background-color: rgb(91, 147, 91);
    }
  }
}
</style>
