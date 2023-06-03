import { FIXED_KEY } from "./config";

/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 14:22:38
 * @LastEditTime: 2023-02-06 17:55:12
 * @LastEditors: yuanshuai
 * @Description: pm2配置文件
 * @FilePath: /serve/src/config/pm2.config.ts
 */
export const apps = [
    {
        name: "formal", //需与package.json里--only 后缀名相同
        script: "./src/app.ts",
        args: "one two",
        instances: 1,
        cron_restart: "0 03 * * *",
        autorestart: true,
        watch: true,
        ignore_watch: [
            // 不用监听的文件
            "node_modules",
            "log"
        ],
        max_memory_restart: "300M",
        env: {
            NODE_ENV: FIXED_KEY.prodEnv //process.env.NODE_ENV值
        }
    },
    {
        name: "test", //需与package.json里--only 后缀名相同
        script: "./src/app.ts",
        args: "one two",
        instances: 1,
        cron_restart: "0 03 * * *",
        autorestart: true,
        watch: true,
        ignore_watch: [
            // 不用监听的文件
            "node_modules",
            "log"
        ],
        max_memory_restart: "300M",
        env: {
            NODE_ENV: FIXED_KEY.testEnv //process.env.NODE_ENV值
        }
    }
];
