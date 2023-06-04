// 全局处理异常
export default (app: any) => {
  app.use(async (ctx: any, next: any) => {
    let status = null;
    try {
      await next();
      status = ctx.status;
    } catch (err: any) {
      // 抛出错误
      status = err.status

      ctx.body = {
        code: status,
        url: ctx.request.url,
        Error: err.message,
      };
    }

    ctx.response.status = status;
  });
};
// export default async (ctx: any, next: any) => {
//   return await next().catch((e: any) => {
//     if (401 === e.status) {
//       ctx.status = 401;
//       ctx.body = {
//         url: ctx.request.url,
//         msg: "Protected resource, use Authorization header to get access\n",
//       };
//     } else {
//       ctx.status = e.status || 500;
//       ctx.body = Object.assign(
//         {
//           code: 500,
//           msg: e.message,
//         },
//         process.env.NODE_ENV === "development" ? { stack: e.stack } : {}
//       );
//     }
//   });
// };
