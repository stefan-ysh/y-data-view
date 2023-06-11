import sequelize from "../services/pool";
import { Model, DataTypes } from "sequelize";
import moment from "moment";

// 定义大屏模型
class Bigscreen extends Model {}

// 初始大屏模型
Bigscreen.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键ID",
    },

    title: {
      type: DataTypes.STRING,
      comment: "大屏名称",
    },

    description: {
      type: DataTypes.STRING,
      comment: "大屏描述",
    },

    group: {
      type: DataTypes.STRING || DataTypes.NUMBER,
      comment: "大屏描述",
    },

    bgImg: {
      type: DataTypes.STRING,
      comment: "大屏背景图片",
    },
    thumb: {
      type: DataTypes.STRING,
      comment: "大屏缩略图",
    },

    width: {
      type: DataTypes.STRING,
      comment: "大屏宽度",
      defaultValue: "1920",
    },

    height: {
      type: DataTypes.STRING,
      comment: "大屏高度",
      defaultValue: "1080",
    },

    bgColor: {
      type: DataTypes.STRING,
      comment: "大屏背景色",
    },

    components: {
      type: DataTypes.JSON,
      comment: "大屏组件数据",
    },

    isPublic: {
      type: DataTypes.BOOLEAN,
      comment: "是否公开",
      defaultValue: true,
    },

    password: {
      type: DataTypes.STRING,
      comment: "访问密码",
      // defaultValue: "123456"
    },
  },
  {
    sequelize,
    modelName: "bigscreen",
    freezeTableName: true,
  }
);

export default Bigscreen;
