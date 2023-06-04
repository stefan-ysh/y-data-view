// 引入koa
import Koa from "koa";
import jwt from "koa-jwt";
const { publicRouter, privateRouter } = require("./routers/index");
const cors = require('koa2-cors')
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
app.use(cors({
  //设置允许来自指定域名请求
  origin: (ctx:any) => {
    return '*'  // 允许来自所有域名请求
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))

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
