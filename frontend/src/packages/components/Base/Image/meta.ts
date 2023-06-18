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
  screenshot: "https://www.svgrepo.com/show/298556/text-box.svg",
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
        defaultValue: "https://www.svgrepo.com/show/298556/text-box.svg",
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
        defaultValue: 'https://www.svgrepo.com/show/298556/text-box.svg',
        setter: {
          name: "string",
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
        title: "图片宽度",
        name: "width",
        description: "图片宽度",
        defaultValue: 200,
        setter: {
          name: "number",
          max: 1000,
        },
      },
      {
        title: "图片高度",
        name: "height",
        description: "图片高度",
        defaultValue: 200,
        setter: {
          name: "number",
          max: 1000,
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
