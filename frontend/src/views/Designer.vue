<template>
  <n-layout class="designer-wrap">
    <header>
      <div>
        <n-button @click="router.push('/')">Back</n-button>
        <span>ID：{{ router.currentRoute.value.query.id }}</span>
      </div>
      <div></div>
      <div>
        <n-button>导入</n-button>
        <n-button>导出</n-button>
        <n-button>清空画布</n-button>
        <n-button>预览</n-button>
        <n-button>保存</n-button>
      </div>
    </header>
    <div class="designer-container">
      <Left class="left"/>
      <Designer class="center" />
      <Right class="right"/>
    </div>
  </n-layout>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Left from '@/components/Design/Left/index.vue'
import Right from '@/components/Design/Right/index.vue'
import Designer from '@/components/Design/Designer/index.vue'
const router = useRouter()

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
      width: 200px;
      height: 100%;
      // background-color: rgb(220, 185, 185);
    }
    .center {
      width: 100%;
      height: 100%;
      background-color: rgb(84, 84, 134);
    }
    .right {
      width: 200px;
      height: 100%;
      // background-color: rgb(91, 147, 91);
    }
  }
}
</style>
