import sequelize from "../services/pool";
import { Model, DataTypes } from "sequelize";
import moment from "moment";

// 定义分组模型
class Group extends Model {}

// 初始分组模型
Group.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键ID",
    },
    label: {
      type: DataTypes.STRING,
      comment: "分组名称",
    },
    parentId: {
      type: DataTypes.STRING || DataTypes.INTEGER,
      comment: "子分组数据",
    },
  },
  {
    sequelize,
    modelName: "group",
    freezeTableName: true,
  }
);
// 定义 Group 模型间的关系
Group.hasMany(Group, { as: 'children', foreignKey: 'parentId' });
Group.belongsTo(Group, { as: 'parent', foreignKey: 'parentId' });

export default Group;
