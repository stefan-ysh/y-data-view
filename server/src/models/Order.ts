/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 15:40:00
 * @LastEditTime: 2023-02-06 16:38:28
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/models/Order.ts
 */
import sequelize from "../services/pool";
import { Model, DataTypes } from "sequelize";

// 定义管理员模型
class Order extends Model {}

// 初始管理员模型
Order.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },

        order_num: {
            type: DataTypes.STRING,
            comment: "订单号;系统自定义"
        },

        user_id: {
            type: DataTypes.INTEGER,
            comment: "用户id"
        },

        product_id: {
            type: DataTypes.INTEGER,
            comment: "产品id"
        },

        count: {
            type: DataTypes.INTEGER,
            comment: "下单数量"
        },

        real_price: {
            type: DataTypes.DOUBLE,
            comment: "实付金额"
        },

        order_status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: "订单状态 1待支付 2已支付 3交易已关闭（未支付导致交易失效） 4退款中 5退款已完成"
        },

        project: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "game",
            comment: "下单平台 game(game小程序) wallpaper(壁纸小程序) admin(运营后台) game-h5(game公众号端) wallpaper-h5(壁纸公众号端) web(pc官网) app(app端)"
        },

        wx_order_num: {
            type: DataTypes.STRING,
            comment: "微信支付订单号"
        },

        bank_type: {
            type: DataTypes.STRING,
            comment: "支付方式"
        }
    },
    {
        sequelize,
        modelName: "order",
        freezeTableName: true
    }
);

export default Order;
