/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 15:40:00
 * @LastEditTime: 2023-02-06 16:19:12
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/models/VerificationCode.ts
 */
import sequelize from "../services/pool";
import { Model, DataTypes } from "sequelize";
import moment from "moment";

// 定义管理员模型
class VerificationCode extends Model {}

// 初始管理员模型
VerificationCode.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },

        target: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "发送对象 手机号或者邮箱"
        },

        code: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "验证码"
        },

        project: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "game",
            comment: "项目标识,game(game小程序) wallpaper(壁纸小程序) admin(运营后台) game-h5(game公众号端) wallpaper-h5(壁纸公众号端) web(pc官网) app(app端)"
        },

        code_type: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: "1邮箱验证码 2手机号验证码"
        },

        expire: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "过期时间"
        }
    },
    {
        sequelize,
        modelName: "verification_code",
        freezeTableName: true
    }
);

export default VerificationCode;
