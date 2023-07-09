interface Snippet {
  name: string;
  group: string;
  category: string;
  code: string;
  componentName: string;
  screenshot: string;
}
interface ImageComponentMeta {}
const snippet: Snippet = {
  name: "轮播图",
  code: "carousel",
  componentName: "Carousel",
  group: "基础类",
  category: "展示组件",
  screenshot:
    "https://www.svgrepo.com/show/527847/posts-carousel-horizontal.svg",
};

const ImageComponentMeta: any = {
  docUrl: "",
  configure: {
    props: [
      // {
      //   title: "视频地址",
      //   name: "src",
      //   description: "类型",
      //   defaultValue: "http://vjs.zencdn.net/v/oceans.mp4",
      //   setter: {
      //     name: "string",
      //     condition: () => {
      //       return true;
      //     },
      //   },
      // },
      {
        title: "触发方式",
        name: "trigger",
        description: "触发切换图片的方式",
        defaultValue: "click",
        setter: {
          name: "select",
          options: [
            {
              label: "点击",
              value: "click",
            },
            {
              label: "鼠标移入",
              value: "hover",
            },
          ],
        },
      },
      {
        title: "切换间隔",
        name: "interval",
        description: "轮播图切换的间隔时间",
        defaultValue: 3,
        setter: {
          name: "number",
          min: 1,
          max: 10,
          step: 1,
        },
      },
      {
        title: "方向",
        name: "direction",
        description: "轮播图切换的方向",
        defaultValue: "horizontal",
        setter: {
          name: "select",
          options: [
            {
              label: "水平",
              value: "horizontal",
            },
            {
              label: "垂直",
              value: "vertical",
            },
          ],
        },
      },
      {
        title: "显示点",
        name: "showDots",
        description: "是否显示点",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
      {
        title: "点位置",
        name: "dotPlacement",
        description: "切换轮播图指示点的位置",
        defaultValue: "bottom",
        condition: (target) => {
          return target.props.showDots;
        },
        setter: {
          name: "select",

          options: [
            {
              label: "下",
              value: "bottom",
            },
            {
              label: "上",
              value: "top",
            },
            {
              label: "左",
              value: "left",
            },
            {
              label: "右",
              value: "right",
            },
          ],
        },
      },
      {
        title: "点样式",
        name: "dotType",
        description: "切换轮播图指示点的样式",
        defaultValue: "bottom",
        condition: (target) => {
          return target.props.showDots;
        },
        setter: {
          name: "select",

          options: [
            {
              label: "点",
              value: "dot",
            },
            {
              label: "线",
              value: "line",
            },
          ],
        },
      },

      {
        title: "切换效果",
        name: "effect",
        description: "轮播图切换时的过渡效果",
        defaultValue: "slide",
        setter: {
          name: "select",
          options: [
            {
              label: "滑动",
              value: "slide",
            },
            {
              label: "淡入淡出",
              value: "fade",
            },
            {
              label: "卡片",
              value: "card",
            },
          ],
        },
      },
      {
        title: "拖拽",
        name: "draggable",
        description: "是否可通过拖拽的方式进行切换",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
      {
        title: "鼠标滑轮",
        name: "mousewheel",
        description: "是否可通过鼠标滑轮的方式进行切换",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
      {
        title: "轮播图片",
        name: "imgList",
        description: "轮播图片",
        defaultValue: [
          "https://www.svgrepo.com/show/278414/error.svg",
          "https://www.svgrepo.com/show/278414/error.svg",
          "https://www.svgrepo.com/show/278414/error.svg",
        ],
        setter: {
          name: "string",
        },
      },
      {
        title: "自动播放",
        name: "autoplay",
        description: "是否自动播放",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
      {
        title: "循环播放",
        name: "loop",
        description: "是否循环播放",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
      {
        title: "显示箭头",
        name: "showArrow",
        description: "是否显示左右箭头",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
    ],
    style: [],
    supports: {
      style: true,
      animation: true,
      event: ["@click", "@change", "@focus", "@blur", "@dblclick"],
    },
  },
};
export default {
  snippet,
  ...ImageComponentMeta,
};
