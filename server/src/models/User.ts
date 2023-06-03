/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 15:40:00
 * @LastEditTime: 2023-02-06 16:09:16
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/models/User.ts
 */
import sequelize from "../services/pool";
import { Model, DataTypes } from "sequelize";
import moment from "moment";

// 定义管理员模型
class User extends Model {}

// 初始管理员模型
User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },

        user_name: {
            type: DataTypes.STRING,
            comment: "昵称"
        },

        avatar: {
            type: DataTypes.STRING,
            comment: "微信头像"
        },

        mobile: {
            type: DataTypes.STRING,
            comment: "手机号"
        },

        password: {
            type: DataTypes.STRING,
            comment: "账号密码",
            defaultValue: "123456"
        },

        email: {
            type: DataTypes.STRING,
            comment: "邮箱"
        }
    },
    {
        sequelize,
        modelName: "user",
        freezeTableName: true
    }
);

export default User;
