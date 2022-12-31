<template>
  <div class="nav-main">
    <canvas id="canvas-2761"></canvas>
    <span v-for="(tab, i) in tabs" :key="tab.value" class="nav-span"
      ><span class="nav-link" @click="_toggle(i)">{{ tab.label }} </span></span
    >
    <div class="user-info-wrap">
      <n-button @click="setting.changeTheme">
        <Icon v-if="setting.theme === 'dark'" size="20">
          <SunnyIcon />
        </Icon>
        <Icon v-else size="20">
          <MoonIcon />
        </Icon>
      </n-button>
      <n-button @click="setting.changeLanguage">
        <Icon size="20">
          <LanguageIcon />
        </Icon>
      </n-button>
      <n-avatar
        :style="{
          color: '#000',
          backgroundColor: 'lightblue',
        }"
      >
        User
      </n-avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useSettingStore } from "@/stores/setting";
import { icon } from "@/icon";
import { Icon } from "@vicons/utils";
const { SunnyIcon, MoonIcon, LanguageIcon } = icon.ionicons5;
const setting = useSettingStore();
const tabs = Object.freeze([
  {
    label: "大屏管理",
    value: "bigscreen-list",
  },
  {
    label: "模板中心",
    value: "template-center",
  },
  {
    label: "分组管理",
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
  color: #fff;
  width: auto;
  min-width: 140px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  padding: 0 40px;
  user-select: none;
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
  color: #fff;
  display: flex;
  align-items: center;
}
</style>
