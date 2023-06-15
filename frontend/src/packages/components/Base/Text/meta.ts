interface Snippet {
  name: string;
  group: string;
  category: string;
  screenshot: string;
}
interface ImageComponentMeta {
    
}
const snippet: Snippet = {
  name: "文本",
  group: "基础类",
  category: "展示组件",
  screenshot: "https://www.svgrepo.com/show/298556/text-box.svg",
};

const ImageComponentMeta: any = {
  componentName: "ImageComponent",
  title: "ColorfulButton",
  docUrl: "",
  configure: {
    props: [
      {
        title: {
          label: {
            type: "i18n",
            "en-US": "type",
            "zh-CN": "类型",
          },
          tip: "type | 类型",
        },
        name: "type",
        description: "类型",
        setter: {
          componentName: "RadioGroupSetter",
          props: {
            dataSource: [
              {
                label: "primary",
                value: "primary",
              },
              {
                label: "secondary",
                value: "secondary",
              },
              {
                label: "normal",
                value: "normal",
              },
            ],
            options: [
              {
                label: "primary",
                value: "primary",
              },
              {
                label: "secondary",
                value: "secondary",
              },
              {
                label: "normal",
                value: "normal",
              },
            ],
          },
          initialValue: "primary",
        },
      },
      {
        title: {
          label: {
            type: "i18n",
            "en-US": "color",
            "zh-CN": "color",
          },
        },
        name: "color",
        setter: {
          componentName: "StringSetter",
          isRequired: false,
          initialValue: "",
        },
      },
    ],
    data:[],
    supports: {
      style: true,
      animation: true,
      event: ['@click', '@change', '@focus', '@blur', '@dblclick'],
    }
  },
};
export default {
  snippet,
  ...ImageComponentMeta,
};
