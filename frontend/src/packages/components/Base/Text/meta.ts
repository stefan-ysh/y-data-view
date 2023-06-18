interface Snippet {
  name: string;
  group: string;
  category: string;
  componentName: string;
  code: string;
  screenshot: string;
}
interface ImageComponentMeta {}
const snippet: Snippet = {
  name: "文本",
  code: "text",
  componentName: "Text",
  group: "基础类",
  category: "展示组件",
  screenshot: "https://www.svgrepo.com/show/298556/text-box.svg",
};

const ImageComponentMeta: any = {
  componentName: "Text",
  title: "基础文本",
  code: "text",
  docUrl: "",
  configure: {
    props: [
      {
        title: "内容",
        name: "content",
        description: "文字内容",
        defaultValue: "文本",
        setter: {
          name: "string",
          condition: () => {
            return true;
          },
        },
      },
      {
        title: "边框",
        name: "border",
        defaultValue: false,
        setter: {
          name: "boolean",
        },
      },
    ],
    style: [
      {
        title: "颜色",
        name: "color",
        defaultValue: "rgba(255,255,255,1)",
        setter: {
          name: "color",
        },
      },
      {
        title: "字体大小",
        name: "fontSize",
        defaultValue: 30,
        setter: {
          name: "number",
        },
      },

      {
        title: "边框样式",
        name: "borderStyle",
        defaultValue: "solid",
        condition: (target) => {
          return target.props.border;
        },
        setter: {
          name: "select",
          options: [
            {
              label: "实线",
              value: "solid",
            },
            {
              label: "虚线",
              value: "dashed",
            },
            {
              label: "点线",
              value: "dotted",
            },
            {
              label: "双线",
              value: "double",
            },
            {
              label: "3D凹槽",
              value: "groove",

            },
            {
              label: "3D垄状",
              value: "ridge",
            }
          ],
        },
      },
      {
        title: "边框颜色",
        name: "borderColor",
        defaultValue: "rgba(10,30,80,1)",
        condition: (target) => {
          return target.props.border;
        },
        setter: {
          name: "color",
        },
      },
      {
        title: "边框宽度",
        name: "borderWidth",
        defaultValue: 1,
        condition: (target) => {
          return target.props.border;
        },
        setter: {
          name: "number",
        },
      },
      {
        title: "边框圆角",
        name: "borderRadius",
        defaultValue: 0,
        condition: (target) => {
          return target.props.border;
        },
        setter: {
          name: "number",
        },
      },
      {
        title: "背景色",
        name: "backgroundColor",
        defaultValue: "rgba(10,30,80,1)",
        setter: {
          name: "color",
        },
      },
      {
        title: "字体粗细",
        name: "fontWeight",
        defaultValue: "normal",
        setter: {
          name: "select",
          options: [
            {
              label: "常规",
              value: "normal",
            },
            {
              label: "粗体",
              value: "bold",
            },
            {
              label: "更粗",
              value: "bolder",
            },
            {
              label: "更细",
              value: "lighter",
            },
          ],
        },
      },
      {
        title: "字体样式",
        name: "fontStyle",
        defaultValue: "normal",
        setter: {
          name: "select",
          options: [
            {
              label: "常规",
              value: "normal",
            },
            {
              label: "斜体",
              value: "italic",
            },
          ],
        },
      },
      {
        title: "字体",
        name: "fontFamily",
        defaultValue: "Microsoft YaHei",
        setter: {
          name: "select",
          options: [
            {
              label: "微软雅黑",
              value: "Microsoft YaHei",
            },
            {
              label: "宋体",
              value: "SimSun",
            },
            {
              label: "黑体",
              value: "SimHei",
            },
            {
              label: "楷体",
              value: "KaiTi",
            },
            {
              label: "仿宋",
              value: "FangSong",
            },
            {
              label: "隶书",
              value: "LiSu",
            },
          ],
        },
      },
      {
        title: "对齐方式",
        name: "textAlign",
        defaultValue: "left",
        setter: {
          name: "select",
          options: [
            {
              label: "左对齐",
              value: "left",
            },
            {
              label: "居中",
              value: "center",
            },
            {
              label: "右对齐",
              value: "right",
            },
          ],
        },
      },
      {
        title: "行高",
        name: "lineHeight",
        defaultValue: null,
        setter: {
          name: "number",
        },
      },
      {
        title: "行数",
        name: "lineClamp",
        defaultValue: 1,
        setter: {
          name: "number",
        },
      },
      {
        title: "文本装饰",
        name: "textDecoration",
        defaultValue: "none",
        setter: {
          name: "select",
          options: [
            {
              label: "无",
              value: "none",
            },
            {
              label: "下划线",
              value: "underline",
            },
            {
              label: "上划线",
              value: "overline",
            },
            {
              label: "删除线",
              value: "line-through",
            },
          ],
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
