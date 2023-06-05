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
    children: {
      type: DataTypes.JSON,
      comment: "子分组数据",
    },
  },
  {
    sequelize,
    modelName: "group",
    freezeTableName: true,
  }
);

export default Group;
