/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 14:56:01
 * @LastEditTime: 2023-02-07 16:03:55
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/controllers/index.ts
 */
"use strict";

import fs from "fs";

const files = fs.readdirSync(__dirname).filter((file: string) => file !== "index.ts");

const controllers = {} as any;

for (const file of files) {
    if (file.toLowerCase().endsWith("ts")) {
        const controller = require(`./${file}`);
        controllers[`${file.replace(/\.ts/, "")}`] = controller;
    }
}

export default controllers;
