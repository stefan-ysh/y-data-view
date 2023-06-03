/*
 * @Author: yuanshuai
 * @Date: 2023-02-06 13:49:22
 * @LastEditTime: 2023-02-06 17:54:06
 * @LastEditors: yuanshuai
 * @Description:
 * @FilePath: /serve/src/utils/util.ts
 */
import { Context } from "koa";

// 获取本机ip地址
export const getIpAddress = () => {
    var interfaces = require("os").networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
                return alias.address;
            }
        }
    }
};

//获取客户端ip地址
export const getClientIp = (req: Context) => {
    var ip = req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || "";
    if (ip.split(",").length > 0) {
        ip = ip.split(",")[0];
    }
    ip = ip.substr(ip.lastIndexOf(":") + 1, ip.length);
    console.log("ip:" + ip);
    return ip;
};
