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
  name: "图片",
  code: "image",
  componentName: "Image",
  group: "基础类",
  category: "展示组件",
  screenshot: "https://www.svgrepo.com/show/474495/picture.svg",
};

const ImageComponentMeta: any = {
  componentName: "Image",
  title: "图片",
  code: "image",
  docUrl: "",
  configure: {
    props: [
      {
        title: "图片地址",
        name: "src",
        description: "类型",
        defaultValue: "https://tse3-mm.cn.bing.net/th/id/OIP-C.S3l9KiUczMTGfsq6JS9EJAHaEo?w=297&h=185&c=7&r=0&o=5&dpr=2&pid=1.7",
        setter: {
          name: "string",
          condition: () => {
            return true;
          },
        },
      },
      {
        title: "加载失败视图",
        name: "fallbackSrc",
        description: "加载失败时候展示的图片",
        defaultValue: "https://www.svgrepo.com/show/278414/error.svg",
        setter: {
          name: "string",
        },
      },
      {
        title: "预览",
        name: "previewDisabled",
        description: "是否开启点击图片进行预览",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
      {
        title: "工具栏",
        name: "showToolbar",
        description: "是否开启点击图片进行预览",
        defaultValue: true,
        condition: (target) => {
          return target.props.previewDisabled;
        },
        setter: {
          name: "boolean",
        },
      },
      {
        title: "工具栏提示",
        name: "showToolbarTooltip",
        description: "是否开启点击图片进行预览",
        defaultValue: true,
        condition: (target) => {
          return target.props.previewDisabled;
        },
        setter: {
          name: "boolean",
        },
      },
      {
        title: "图片说明",
        name: "alt",
        description: "鼠标移入展示的说明文字",
        defaultValue: "一张图片",
        setter: {
          name: "string",
        },
      },
      {
        title: "适配方式",
        name: "objectFit",
        defaultValue: "contain",
        setter: {
          name: "select",
          options: [
            {
              label: "contain",
              value: "contain",
            },
            {
              label: "cover",
              value: "cover",
            },
            {
              label: "fill",
              value: "fill",
            },
          ],
        },
      },
    ],
    style: [
      {
        title: "圆角",
        name: "borderRadius",
        defaultValue: 5,
        setter: {
          name: "number",
        },
      },
    ],
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
