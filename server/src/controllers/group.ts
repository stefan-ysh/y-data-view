import { getGroupList } from "../services/group";
import R from '../middlewares/responseHandler'

// get all group list
export const groupList = async (ctx: any, next: any) => {
    // let list = await getGroupList({ project: "app" });
    let list = await getGroupList({});
    const b = R.set(list.rows, 200)
    ctx.body = b
    return next();
};
