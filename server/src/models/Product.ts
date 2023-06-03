/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 15:40:00
 * @LastEditTime: 2023-02-06 16:42:29
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/models/Product.ts
 */
import sequelize from "../services/pool";
import { Model, DataTypes } from "sequelize";

// 定义管理员模型
class Product extends Model {}

// 初始管理员模型
Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },

        name: {
            type: DataTypes.STRING,
            comment: "商品名称"
        },

        sub_name: {
            type: DataTypes.STRING,
            comment: "商品简称"
        },

        price: {
            type: DataTypes.DOUBLE,
            comment: "商品原价"
        },

        discount_price: {
            type: DataTypes.DOUBLE,
            comment: "商品折扣价"
        },

        inventory: {
            type: DataTypes.INTEGER,
            defaultValue: 10000,
            comment: "库存"
        },

        remark: {
            type: DataTypes.STRING,
            comment: "支付成功文案"
        },

        project: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "game",
            comment: "商品展示平台 多个以逗号隔开"
        }
    },
    {
        sequelize,
        modelName: "product",
        freezeTableName: true
    }
);

export default Product;
