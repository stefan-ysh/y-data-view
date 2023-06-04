import { getBigscreenList } from "../services/bigscreen";
import R from '../middlewares/responseHandler'

// get all bigscreen list
export const bigscreenList = async (ctx: any, next: any) => {
    // let list = await getBigscreenList({ project: "app" });
    let list = await getBigscreenList({});
    const b = R.set(list.rows, 200)
    ctx.body = b
    return next();
};
