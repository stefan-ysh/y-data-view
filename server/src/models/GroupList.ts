/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 15:40:00
 * @LastEditTime: 2023-02-06 16:31:57
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/models/GroupList.ts
 */
import sequelize from "../services/pool";
import { Model, DataTypes } from "sequelize";

// 定义管理员模型
class GroupList extends Model {}

// 初始管理员模型
GroupList.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "群聊名称"
        },

        link: {
            type: DataTypes.STRING,
            comment: "二维码图片地址"
        },

        hidden: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: "是否隐藏该群聊 1隐藏 2展示"
        }
    },
    {
        sequelize,
        modelName: "group_list",
        freezeTableName: true
    }
);

export default GroupList;
