import Group from "../models/Group";
import { GroupItem } from "../types";
// 查询所有分组
export const getGroupList = async (params: any) => {
  // const { offset = 0, limit = 10 } = params;
  //   const findParams = {
  //     project,
  //   } as {
  //     project?: string;
  //   };

  //   if (!findParams.project) delete findParams["project"];

  // return await Group.findAndCountAll({
  //   limit,
  //   offset,
  //   // order: [["id", "desc"]],
  //   // where: findParams,
  // });
  // 查询分组树形结构
  const groups = await Group.findAll({
    include: [{ model: Group, as: "children"}],
  });

  const tree = groups.filter((g: any) => g.parentId === null);
  
  return tree.map((t) => t.toJSON())
};

// 新增分组
export const createGroup = async (groupInfo: GroupItem) => {
  const { label, parentId } = groupInfo;
  if (!label) {
    return {
      code: 400,
      msg: "分组名称不能为空",
    };
  }

  return {
    code: 200,
    msg: "新增分组成功",
    data: await Group.create({
      label,
      parentId,
    }),
  };
};
