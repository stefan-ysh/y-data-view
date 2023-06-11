import { getGroupList, createGroup as C } from "../services/group";
import R from '../middlewares/responseHandler'

// get all group list
export const groupList = async (ctx: any, next: any) => {
    // let list = await getGroupList({ project: "app" });
    let list = await getGroupList({});
    const b = R.set(list, 200)
    b.data.forEach((el:any) => {
        // If children is empty, set it to null
        el.children  = el.children?.length ? el.children : null
    })
    ctx.body = b
    return next();
};

export const createGroup = async (ctx: any, next: any) => {
    const res = await C(ctx.request.body);
    ctx.body = res
    return next();
}