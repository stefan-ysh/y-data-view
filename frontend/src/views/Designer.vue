<template>
  <n-layout class="designer-wrap">
    <header>
      <div>
        <n-button @click="router.push('/')">Back</n-button>
        <span>ID：{{ router.currentRoute.value.query.id }}</span>
      </div>
      <div>{{ title }}</div>
      <div class="operation-btns" style="display: flex; align-items: center;">
        <!-- switch theme mode light/dark -->
        <Icon
          class="system-setting-btn"
          v-if="setting.theme === 'light'"
          @click="setting.changeTheme"
          size="20"
        >
          <SunnyIcon />
        </Icon>
        <Icon
          class="system-setting-btn"
          v-else
          @click="setting.changeTheme"
          size="20"
        >
          <MoonIcon />
        </Icon>
        <n-button>导入</n-button>
        <n-button>导出</n-button>
        <n-button>清空画布</n-button>
        <n-button>预览</n-button>
        <n-button>保存</n-button>
      </div>
    </header>
    <div class="designer-container">
      <Left class="left" />
      <Designer class="center" />
      <Right class="right" />
    </div>
  </n-layout>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Left from '@/components/Design/Left/index.vue'
import Right from '@/components/Design/Right/index.vue'
import Designer from '@/components/Design/Designer/index.vue'
import BigscreebApi from '@/api/bigscreen'
import { Icon } from "@vicons/utils";
const { SunnyIcon, MoonIcon } = icon.ionicons5;
import { onMounted, ref } from 'vue'
import { useSettingStore } from "@/stores";
import { icon } from '@/icon'
const setting = useSettingStore();
const router = useRouter()
const title = ref('')
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
    console.log(res)
    title.value = res.data.title
  } else {
    console.log(res)
  }
})
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: calc(100% - 50px);

    .left {
      width: 300px;
      height: 100%;
      // background-color: rgb(220, 185, 185);
    }

    .center {
      width: 100%;
      height: 100%;
      position: relative;
      // background-color: rgb(84, 84, 134);
      background-image: linear-gradient(var(--n-color) 14px,transparent 0),linear-gradient(90deg,transparent 14px,var(--n-text-color) 0);
      background-size: 15px 15px;
      // background: linear-gradient(-90deg, var(--n-text-color) 1px, transparent 0px) 0px 0px / 20px 20px, linear-gradient(0deg, var(--n-text-color) 1px, var(--n-color) 0px) 0px 0px / 20px 20px
    }

    .right {
      width: 300px;
      height: 100%;
      // background-color: rgb(91, 147, 91);
    }
  }
}</style>
