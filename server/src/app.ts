/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 11:44:07
 * @LastEditTime: 2023-02-07 15:28:15
 * @LastEditors: yuanshuai
 * @Description: 入口文件
 * @FilePath: /serve/src/app.ts
 */
// 引入koa
import Koa from "koa";
import http from "http";
const { publicRouter, privateRouter } = require("./routers/index");
// import publicRouter from "./routers/index";
// import privateRouter from "./routers/index";
import bodyParser from "koa-bodyparser";
import { FIXED_KEY } from "./config/config";
import { getIpAddress } from "./utils/util";

// 创建koa实例
const app = new Koa();

// 创建服务器
const server: http.Server = new http.Server(app.callback());
app.use(bodyParser()); // 引入和使用 koa-bodyparser 中间件
// 解决跨域问题
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "*");
    // ctx.set("Access-Control-Allow-Methods", "*");
    // ctx.set("Access-Control-Allow-Credentials", "true"); // 允许带上 cookie
    await next();
})
app.use(publicRouter.routes()).use(publicRouter.allowedMethods()); // 公共路由
app.use(privateRouter.routes()).use(privateRouter.allowedMethods()); // 私有路由
// 监听端口
app.listen(FIXED_KEY.port, () => {
    const ip = getIpAddress();
    const address = `http://${ip}:${FIXED_KEY.port}`;
    const localAddress = `http://localhost:${FIXED_KEY.port}`;
    console.log(`app started at address \n\n${localAddress}\n\n${address}`);
});

module.exports = app;
