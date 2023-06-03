/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 15:00:51
 * @LastEditTime: 2023-02-07 16:14:20
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/controllers/test.ts
 */

import { getUserList, registerUser, loginUser } from "../services/user";

export const userList = async (ctx: any, next: any) => {
    // ctx.body = process.env.NODE_ENV;
    // let list = await getUserList({ project: "app" });
    let list = await getUserList({});
    ctx.body = {
        count: list.count,
        list: list.rows || []
    };
    return next();
};

export const testPost = (ctx: any, next: any) => {
    ctx.body = "testPost";
    return next();
};
export const register = async (ctx: any, next: any) => {
    // 打印请求体
    const res = await registerUser(ctx.request.body);
    ctx.body = res;
    return next();
};
export const login = async (ctx: any, next: any) => {
    // 打印登录请求内容
    const res = await loginUser(ctx.request.body);
    ctx.body = res;
    return next();
};
