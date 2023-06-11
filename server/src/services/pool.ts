"use strict";

import { Sequelize } from "sequelize";
import { FIXED_KEY } from "../config/config";
const { dbName, user, password, host, port } = process.env.NODE_ENV === FIXED_KEY.prodEnv ? FIXED_KEY.database : FIXED_KEY.databaseOfTest;
const sequelize = new Sequelize(dbName, user, password, {
    dialect: "mysql",
    host,
    port,
    timezone: "+08:00",
    logging: false,
    define: {
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        // 把驼峰命名转换为下划线
        underscored: true
    }
});

// 创建模型
sequelize.sync({ force: false, alter: true }).catch((err) => {
    console.error(err);
})

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

export default sequelize;
