import { getBigscreenList, delBigscreen, createBigscreen } from "../services/bigscreen";
import R from '../middlewares/responseHandler'
import {Context, Next} from 'koa'
import { Bigscreen } from "../types/bigscreen";
// get all bigscreen list
export const bigscreenList = async (ctx: Context, next: Next) => {
    // 获取get请求的参数
    const { page, pageSize, title } = ctx.query
    // let list = await getBigscreenList({ project: "app" });
    let list = await getBigscreenList({ page, pageSize, title });
    const data = {
        list: list.rows,
        total: list.count
    }
    const b = R.set(data, 200)
    ctx.body = b
    return next();
};

export const create = async (ctx: Context, next: Next) => {
    const params = ctx.request.body as Bigscreen
    // 插入到数据库
    const res = await createBigscreen(params)
    const b = R.set(res, 200)
    ctx.body = b
    return next();
}

export const updateBigscreen = async (ctx: Context, next: Next) => {
    
}

export const del = async (ctx: Context, next: Next) => {
    const { id } = ctx.request.body
    const res = await delBigscreen(id)
    ctx.body = res
    return next();
}