/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 15:40:00
 * @LastEditTime: 2023-02-06 16:18:41
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/models/HeroList.ts
 */
import sequelize from "../services/pool";
import { Model, DataTypes } from "sequelize";

// 定义管理员模型
class HeroList extends Model {}

// 初始管理员模型
HeroList.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },

        name: {
            type: DataTypes.STRING,
            comment: "英雄全名"
        },

        sub_name: {
            type: DataTypes.STRING,
            comment: "英雄简称"
        },

        position: {
            type: DataTypes.STRING,
            comment: "英雄定位"
        },

        official_id: {
            type: DataTypes.INTEGER,
            comment: "官方id"
        },

        avatar: {
            type: DataTypes.STRING,
            comment: "英雄头像"
        },

        background_image: {
            type: DataTypes.STRING,
            comment: "英雄背景大图"
        },

        video: {
            type: DataTypes.STRING,
            comment: "英雄介绍视频"
        },

        skill: {
            type: DataTypes.TEXT,
            comment: "英雄技能"
        },

        story: {
            type: DataTypes.TEXT,
            comment: "英雄背景故事"
        }
    },
    {
        sequelize,
        modelName: "hero_list",
        freezeTableName: true
    }
);

export default HeroList;
