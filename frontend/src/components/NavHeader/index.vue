<template>
  <div class="nav-main">
    <canvas id="canvas-2761"></canvas>
    <span v-for="(tab, i) in tabs" :key="tab.value" class="nav-span">
      <span class="nav-link" @click="_toggle(i)">
        <span class="tab-label">{{ tab.label }}</span>
        <n-button size="small" text v-if="tab.value === 'bigscreen-list' && opt.currentIndex === i"
          @click="showAddBigscreenDialog">
          <n-icon>
            <cash-icon />
          </n-icon>
        </n-button>
      </span>
    </span>
    <div class="user-info-wrap">
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
      <n-dropdown trigger="hover" :options="languageList" @select="changeLang">
        <Icon size="20" class="system-setting-btn">
          <LanguageIcon />
        </Icon>
      </n-dropdown>
      <!-- user info -->
      <n-dropdown :options="userinfoOptions" @select="handleSelect">
        <n-avatar class="avatar" round src="src/assets/images/einstein.jpg" />
      </n-dropdown>
    </div>
  </div>
  <n-modal v-model:show="addBigscreenModal">
    <n-spin :show="isLoading" description="处理中，请稍候...">
      <n-card style="width: 600px" title="新建大屏" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <div>
          <n-form ref="formRef" :model="bigscreenForm" :rules="bigscreenFormRules" label-placement="left"
            label-width="auto" require-mark-placement="right-hanging">
            <!-- <n-form-item label="Root Directory" path="isPublic">
            <n-switch v-model:value="bigscreenForm.isPublic" />
          </n-form-item> -->
            <!-- <n-form-item label="Parent Group" path="parentGroup" v-if="!bigscreenForm.isPublic">
              <n-cascader
                v-model:value="bigscreenForm.parentGroup"
                placeholder=""
                expand-trigger="hover"
                :options="menuOptions"
                label-field="label"
                value-field="id"
                children-field="children"
                check-strategy="all"
                @update:value="handleSelectChangeParentGroup"
              />
            </n-form-item> -->
            <n-form-item label="大屏分组" path="group">
              <n-select v-model:value="bigscreenForm.group" value-field="id" placeholder="请选择分组" :options="groupOptions" />
            </n-form-item>
            <n-form-item label="大屏名称" path="title">
              <n-input v-model:value="bigscreenForm.title" placeholder="" />
            </n-form-item>
            <n-form-item label="大屏简介" path="description">
              <n-input placeholder="" v-model:value="bigscreenForm.description" type="textarea" :autosize="{
                minRows: 3,
                maxRows: 5,
              }" />
            </n-form-item>
          </n-form>
        </div>
        <template #footer>
          <n-button style="width: 100%" type="primary" @click="handleAdd">确定</n-button>
        </template>
      </n-card>
    </n-spin>
  </n-modal>
</template>

<script lang="ts" setup>
import { h as hRender, computed, onMounted, onUnmounted, ref } from "vue";
// import type { Component } from "vue";
import { useSettingStore, useBigscreenStore } from "@/stores";
import { icon } from "@/icon";
import { Icon } from "@vicons/utils";
import { languageList } from "@/lang/index";
import { useI18n } from "vue-i18n";
import { NIcon, NButton, NModal, FormInst, NSpin } from "naive-ui";
import router from "@/router";
const { SunnyIcon, MoonIcon, LanguageIcon, UserIcon, EditIcon, LogoutIcon, SettingsSharpIcon } =
  icon.ionicons5;
import { AddCircleOutline as CashIcon } from '@vicons/ionicons5'
import {useBigscreen} from "@/hooks";
const BStore = useBigscreenStore()
// import BigscreenApi from "@/api/bigscreen";
const { getBigscreenList, createBigscreen } = useBigscreen();
const setting = useSettingStore();
const { locale } = useI18n();
// const lang = ref(setting.lang);
// change the language of platform
const changeLang = (key: "zh" | "en") => {
  locale.value = key;
  setting.changeLanguage(key);
};

// todo 渲染图标函数，后续考虑做成utils
 const renderIcon = (icon: any, set = {}) => {
  return () => hRender(NIcon, set, { default: () => hRender(icon) })
}

// click right dropdown menu
const handleSelect = (key: string) => {
  if(key === "logout"){
    window.$dialog.warning({
      title: '退出提示',
      content: '确定要退出吗?',
      positiveText: '取消',
      negativeText: '退出',
      onPositiveClick: () => {
        window.$message.success('取消退出')
      },
      onNegativeClick: () => {
        if(key === "logout"){
          localStorage.removeItem("token");
          router.push("/login");
        }
      }
    })
  }
}
// 用户信息下拉框
const userinfoOptions = computed(() => [
  {
    label: localStorage.getItem("userName"),
    key: "userInfo",
    icon: renderIcon(UserIcon),
  },
    {
    type: 'divider',
    key: 'd1'
  },
  {
    label: $t("global.sys_set"),
    key: "sysSet",
    icon: renderIcon(SettingsSharpIcon),
  },
  {
    label: $t("global.logout"),
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
]);
const formRef = ref<FormInst | null>(null)
const bigscreenForm = ref({
  title: '',
  description: '',
});
const bigscreenFormRules = {
  title: {
    required: true,
    trigger: ["blur", "input"],
    message: "bigscreen name is required!",
  },
};

const addBigscreenModal = ref(false);
const isLoading = ref(false);
// show the add bigscreen dialog
const showAddBigscreenDialog = () => {
  addBigscreenModal.value = true;
}
const groupOptions = computed(() => {
  return  BStore.groupList
})
const curGroup = computed(() => {
  return BStore.curGroup
})
const handleAdd = async () => {
  isLoading.value = true;
  const res = await createBigscreen(bigscreenForm.value)
  if(res.code === 200){
    window.$message.success('创建成功')
    addBigscreenModal.value = false;
    isLoading.value = false
    const params = {
      page: 1,
      pageSize: 10,
      title: '',
      group: curGroup.value
    }
    getBigscreenList(params)
  } else {
    isLoading.value = false
    window.$message.error(res.msg)
  }
}
const tabs = computed(() => [
  {
    label: $t("project.bigscreen_manager"),
    value: "bigscreen-list",
  },
  {
    label: $t("project.template_center"),
    value: "template-center",
  },
  {
    label: $t("project.group_manager"),
    value: "group-manager",
  },
]);
const emit = defineEmits(["change-tab"]);
const opt = ref<any>({});
const c = Math.min;
const h = Math.sign;
const m = Math.max;
const n = Math.abs;
const j = ref(0.85);
const k = ref(10);
const l = ref(4);
// 计算速度
const calcAVGSpeed = (a: number) => {
  let b =
    (l.value * j.value * a + k.value * (1 - j.value) * a) /
    (k.value * l.value * 20);
  return (b = m(n(b), 2.5) * h(b)), b;
};
const _toggle = (navindex: number) => {
  emit("change-tab", navindex);
  "undefined" !== typeof navindex &&
    navindex !== opt.value.currentIndex &&
    opt.value.tabWidthList &&
    opt.value.tabWidthList.length &&
    (!opt.value.animating || navindex !== opt.value.nextIndex) &&
    ((opt.value.animating = true),
    (opt.value.distance =
      opt.value.tabWidthList[navindex] -
      opt.value.tabWidthList[opt.value.currentIndex]),
    (opt.value.avgSpeed = calcAVGSpeed(opt.value.distance)),
    (opt.value.curDisX = 0),
    (opt.value.nextIndex = navindex));
  return false;
};
const _initCanvas = (canvas: any, width: number, height: number) => {
  const devicePixelRatio = window.devicePixelRatio,
    canvasObj = canvas.getContext("2d");
  (canvas.width = width * devicePixelRatio),
    (canvas.height = height * devicePixelRatio),
    (canvas.style.width = width + "px"),
    (canvas.style.height = height + "px"),
    canvasObj.scale(devicePixelRatio, devicePixelRatio);
};

const resize = () => {
  opt.value.timer && cancelAnimationFrame(opt.value.timer);
  _calcTabs();
  _initCanvas(opt.value.canvas, opt.value.width, opt.value.height), draw(0);
};

const _calcTabs = () => {
  let a = document.querySelectorAll(".nav-main .nav-span"),
    b = [],
    c = 0;
  Array.prototype.forEach.call(a, function (a) {
    b.push(c), (c += a.offsetWidth);
  }),
    (b[0] = -20),
    b.push(c),
    (opt.value.tabWidthList = b),
    (opt.value.tabHeight = a[0].offsetHeight + 0),
    (opt.value.height = opt.value.tabHeight + 20),
    (opt.value.width = window.innerWidth);
};
const draw = (a) => {
  _drawHightlight(a);
  //return false;

  opt.value.timer = requestAnimationFrame(function () {
    //console.log(a);
    draw((a + 0.005) % 1.6);
  });
};
const _drawHightlight = (a) => {
  //a = 0
  let b = opt.value.canvas.getContext("2d") as CanvasRenderingContext2D,
    d = 0.3;
  //clearRect 在给定的矩形内清除指定的像素,这里清完了
  b.clearRect(0, 0, 2 * opt.value.width, 2 * opt.value.height);
  b.shadowColor = "rgba(0, 193, 220, 1)";
  b.shadowBlur = 5;
  b.strokeStyle = "#004CB3";
  b.lineWidth = 0.8;
  b.fillStyle = "none";
  _draw(b, false);
  //这里绘制了外围边框线条
  //return false;
  let e = b.createLinearGradient(0, 0, opt.value.width, opt.value.height),
    f = a - d;
  e.addColorStop(c(1, m(0, 0 + f)), "rgba(0,0,0,0)");
  e.addColorStop(c(1, m(0, 0 + f + 0.1)), "#8ED6FF");
  e.addColorStop(c(1, 0 + f + d), "#8ED6FF");
  e.addColorStop(c(1, 0 + f + d + 0.1), "rgba(0,0,0,0)");
  e.addColorStop(1, "rgba(0,0,0,0)");
  b.lineWidth = 1.5;
  b.strokeStyle = e;
  b.fillStyle = opt.value.pattern;
  _draw(b, true);
};

const _calCurve = (a, b, c, d, e, f) => {
  e.bezierCurveTo(a + f, b, c - f, d, c, d);
};
const getCurSpeed = (a: number, b: number) => {
  let c =
    n(a) > n(j.value * b)
      ? l.value * opt.value.avgSpeed
      : k.value * opt.value.avgSpeed;
  return c;
};
const _draw = (canvasObj: CanvasRenderingContext2D, trueorfalse: boolean) => {
  let navindex = opt.value.currentIndex,
    tableHeight = opt.value.tabHeight,
    f = 0,
    g = 40,
    i = 20,
    j = 0.5,
    k = 2.5,
    l = 0;
  if (
    (canvasObj.beginPath(),
    canvasObj.moveTo(-50, opt.value.height + 10),
    canvasObj.lineTo(-50, tableHeight + j),
    opt.value.animating)
  ) {
    let m = getCurSpeed(opt.value.curDisX, opt.value.distance);
    l = c(n(opt.value.distance), n(opt.value.curDisX + m)) * h(m);
  }
  if (
    (canvasObj.lineTo(
      f + opt.value.tabWidthList[navindex] + l - g / 2,
      tableHeight + j
    ),
    _calCurve(
      f + opt.value.tabWidthList[navindex] + l - g / 2,
      tableHeight + j,
      f + opt.value.tabWidthList[navindex] + l + g / 2,
      k + j,
      canvasObj,
      i
    ),
    opt.value.animating)
  ) {
    let o =
      opt.value.tabWidthList[opt.value.nextIndex + 1] -
      opt.value.tabWidthList[opt.value.nextIndex];
    canvasObj.lineTo(
      f + opt.value.tabWidthList[navindex] + o + l - g / 2,
      k + j
    ),
      _calCurve(
        f + opt.value.tabWidthList[navindex] + o + l - g / 2,
        k + j,
        f + opt.value.tabWidthList[navindex] + o + l + g / 2,
        tableHeight + j,
        canvasObj,
        i
      );
  } else {
    //lineTO添加一个新点 宽度长度
    canvasObj.lineTo(
      f + opt.value.tabWidthList[navindex + 1] + l - g / 2,
      k + j
    );
    _calCurve(
      f + opt.value.tabWidthList[navindex + 1] + l - g / 2,
      k + j,
      f + opt.value.tabWidthList[navindex + 1] + l + g / 2,
      tableHeight + j,
      canvasObj,
      i
    );
  }

  canvasObj.lineTo(opt.value.width + 10, tableHeight + j);
  canvasObj.lineTo(opt.value.width + 10, opt.value.height + 10);
  canvasObj.closePath();
  canvasObj.stroke();
  trueorfalse && canvasObj.fill();
  opt.value.animating &&
    trueorfalse &&
    ((opt.value.curDisX = l),
    n(l) >= n(opt.value.distance) &&
      ((opt.value.animating = false),
      (opt.value.currentIndex = opt.value.nextIndex)));
};
const canvasnav = () => {
  // 初始化第一个 tab 高亮
  opt.value.currentIndex = 0;
  opt.value.canvas = document.getElementById("canvas-2761");

  const _createPattern = (a) => {
    let b = 140,
      c = 63,
      d = 1,
      e = document.createElement("canvas");
    (e.width = b),
      (e.height = c),
      (e.style.width = b / d + "px"),
      (e.style.height = c / d + "px");
    const f = e.getContext("2d") as any;
    //缩放 宽高 100%
    f.scale(d, d);
    f.lineWidth = 0.4;
    for (let g = 3, h = 0.8, j = 1; 30 > j; j++) {
      //设置或返回用于笔触的颜色、渐变或模式
      f.strokeStyle = "RGBA(22, 120, 160, " + h + ")";
      //开始一条路径
      f.beginPath();
      //把路径移动到画布中的指定点，不创建线条
      f.moveTo(0, j * g);
      //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      f.lineTo(b, j * g);
      //绘制已定义的路径
      f.stroke();
      //创建从当前点回到起始点的路径
      f.closePath();
      10 < j && (h -= 0.1);
    }
    const i = a.getContext("2d").createPattern(e, "repeat-x");
    (opt.value.pattern = i), (e = null);
  };
  _toggle(0);
  _calcTabs();
  _initCanvas(opt.value.canvas, opt.value.width, opt.value.height);
  _createPattern(opt.value.canvas);
  draw(0);
};

onMounted(() => {
  window.addEventListener("resize", resize);
  canvasnav();
});
onUnmounted(() => {
  window.removeEventListener("resize", resize);
});
</script>

<style lang="less">
#canvas-2761 {
  position: absolute;
  z-index: -1;
  left: 0px;
}
.nav-main .nav-span,
.datav-nav .nav-main .nav-span .nav-link:hover {
  color: #00baff !important;
}
.nav-main .nav-span .nav-link {
  text-decoration: none !important;
  display: block;
  color: v-bind("setting.theme === 'light' ? '#000' : '#fff'");
  width: auto;
  min-width: 140px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  padding: 0 40px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  .tab-label {
    margin-right: 5px;
  }
}
.datav-icon {
  display: inline-block;
  vertical-align: middle;
}
.datav-font {
  font-family: "datav-font" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.nav-main .nav-icon {
  padding-right: 5px;
  font-size: 20px;
}
.nav-main {
  z-index: 10;
  display: flex;
  position: fixed;
  width: 100%;
  min-width: 1024px;
}
.user-info-wrap {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 10px;
  .system-setting-btn {
    cursor: pointer;
    margin: 0 10px;
  }
  .avatar {
    cursor: pointer;
  }
}
</style>
