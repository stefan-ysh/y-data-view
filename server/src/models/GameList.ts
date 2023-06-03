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
class GameList extends Model {}

// 初始管理员模型
GameList.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },

        name: {
            type: DataTypes.STRING,
            comment: "游戏名称"
        },

        appid: {
            type: DataTypes.STRING,
            defaultValue: 0,
            comment: "游戏所属的微信appid"
        },

        link: {
            type: DataTypes.STRING,
            defaultValue: 0,
            comment: "游戏扫码地址"
        },

        logo: {
            type: DataTypes.STRING,
            comment: "游戏logo"
        }
    },
    {
        sequelize,
        modelName: "game_list",
        freezeTableName: true
    }
);

export default GameList;
