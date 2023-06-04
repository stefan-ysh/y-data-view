// 引入koa
import Koa from "koa";
import jwt from "koa-jwt";
const { publicRouter, privateRouter } = require("./routers/index");
// import publicRouter from "./routers/index";
// import privateRouter from "./routers/index";
import bodyParser from "koa-bodyparser";
import { FIXED_KEY } from "./config/config";
import { JWT_CONFIG } from "./config/jwt.config";
import { getIpAddress } from "./utils/util";
// 创建koa实例
const app = new Koa();

// 引入和使用 koa-bodyparser 中间件
app.use(bodyParser());

// 解决跨域问题
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "*");
    // ctx.set("Access-Control-Allow-Methods", "*");
    // ctx.set("Access-Control-Allow-Credentials", "true"); // 允许带上 cookie
    await next();
})

// 公共路由
app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
// 私有路由
app.use(privateRouter.routes()).use(privateRouter.allowedMethods());

// 利用 jwt 中间件来验证 token
app.use(
  jwt({
    secret: JWT_CONFIG.secret,
  }).unless({
    path: [/\/register/, /\/login/],
  })
);

// 监听端口
app.listen(FIXED_KEY.port, () => {
    const ip = getIpAddress();
    const address = `http://${ip}:${FIXED_KEY.port}`;
    const localAddress = `http://localhost:${FIXED_KEY.port}`;
    console.log(`App is running at address ${localAddress} ${address}`);
});

module.exports = app;
