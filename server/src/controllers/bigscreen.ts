import { getBigscreenList } from "../services/bigscreen";
import R from '../middlewares/responseHandler'

// get all bigscreen list
export const bigscreenList = async (ctx: any, next: any) => {
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
