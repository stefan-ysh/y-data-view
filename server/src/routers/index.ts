"use strict";
import Router from "koa-router";
import controllers from "../controllers";

// -------------公共路由(无需token校验)-----------------------
const publicRouter = new Router();

publicRouter.prefix("/api");
publicRouter.get("/", controllers.user.userList);
publicRouter.get("/bigscreen", controllers.bigscreen.bigscreenList);
publicRouter.post("/bigscreen/del", controllers.bigscreen.del);
publicRouter.post("/bigscreen/create", controllers.bigscreen.create);
publicRouter.post("/bigscreen/update", controllers.bigscreen.update);
publicRouter.get("/bigscreen/detail", controllers.bigscreen.detail);
publicRouter.post("/group/create", controllers.group.createGroup);
publicRouter.get("/group", controllers.group.groupList);
publicRouter.post("/register", controllers.user.register);
publicRouter.post("/login", controllers.user.login);

// --------------私有路由(需token校验)----------------------
const privateRouter = new Router();
privateRouter.prefix("/api");
privateRouter.post("/", controllers.user.testPost);

// export default {
//     privateRouter,
//     publicRouter
// };

module.exports = {
  privateRouter,
  publicRouter,
};
