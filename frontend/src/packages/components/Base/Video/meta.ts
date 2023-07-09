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
  name: "视频",
  code: "video",
  componentName: "Video",
  group: "基础类",
  category: "展示组件",
  screenshot: "https://www.svgrepo.com/show/530237/video.svg",
};

const ImageComponentMeta: any = {
  docUrl: "",
  configure: {
    props: [
      {
        title: "视频地址",
        name: "src",
        description: "类型",
        defaultValue: "http://vjs.zencdn.net/v/oceans.mp4",
        setter: {
          name: "string",
          condition: () => {
            return true;
          },
        },
      },
      {
        title: "视频封面",
        name: "poster",
        description: "未点击播放时候的视频显示封面",
        defaultValue: "https://www.svgrepo.com/show/278414/error.svg",
        setter: {
          name: "string",
        },
      },
      {
        title: "静音",
        name: "muted",
        description: "静音播放",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
      {
        title: "自动播放",
        name: "autoplay",
        description: "是否开启视频自动播放",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
      {
        title: "工具展示",
        name: "controls",
        description: "是否开启点击图片进行预览",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
      {
        title: "循环播放",
        name: "loop",
        description: "播放结束后将进行再次播放",
        defaultValue: true,
        setter: {
          name: "boolean",
        },
      },
    ],
    style: [
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
