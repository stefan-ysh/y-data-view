/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 15:40:00
 * @LastEditTime: 2023-02-06 16:19:00
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/models/GameList.ts
 */
import sequelize from "../services/pool";
import { Model, DataTypes } from "sequelize";
import moment from "moment";

// 定义管理员模型
class CartoonList extends Model {}

// 初始管理员模型
CartoonList.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },

        src: {
            type: DataTypes.STRING,
            comment: "视频地址"
        }
    },
    {
        sequelize,
        modelName: "cartoon_list",
        freezeTableName: true
    }
);

export default CartoonList;
