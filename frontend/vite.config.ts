import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 执行icon name的格式
      symbolId: 'icon-[name]'
  })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/var.scss";',
      },
    },
  },
  resolve: {
    // 使用别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
