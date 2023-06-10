import Group from "../models/Group";
import { GroupItem } from "../types";

// 递归所有数据找到 children
const buildGroupTree = (
  groups: any[],
  parentId: number | null
): GroupItem[] | null => {
  const children = groups.filter((g) => g.parentId === parentId);
  if (children.length === 0) {
    return null;
  }
  return children.map((c) => ({
    id: c.id,
    label: c.label,
    children: buildGroupTree(groups, c.id),
  }));
};

// 查询所有分组
export const getGroupList = async (filter: any): Promise<GroupItem[] | null> => {
  const groups = await Group.findAll({
    include: [{ model: Group, as: "children" }],
  });

  return buildGroupTree(groups, null);
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
