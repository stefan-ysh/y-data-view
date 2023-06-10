import Bigscreen from "../models/Bigscreen";
// const { Op } = require("sequelize");
// import { GetUserList, User as RegisterUser } from "../types/user";
// // 查询所有用户
export const getBigscreenList = async (params: any) => {
  let { page, pageSize: limit, title } = params;

  limit *= 1;
  // 分页
  const offset = (page - 1) * limit;
  // 查询
  // const where: any = {}
  // if (title) {
  //   where["title"] = {
  //     [Op.like]: `%${title}%`,
  //   };
  // }

  const findParams = {
    title
  } as {
      title?: string;
  };

  if (!findParams.title) delete findParams["title"];

  return await Bigscreen.findAndCountAll({
    limit,
    offset,
    // order: [["id", "desc"]],
    where: findParams
  });
};

// // 注册用户
// export const registerUser = async (registerInfo: RegisterUser) => {
//   // 进行校验注册信息
//   const { userName, password } = registerInfo;
//   if (!userName || !password) {
//     return {
//       code: 400,
//       msg: "用户名或密码不能为空",
//     };
//   }
//   // 校验用户名是否已存在
//   const user = await User.findOne({
//     where: { user_name: userName },
//   });
//   if (user) {
//     return {
//       code: 400,
//       msg: "该用户名已存在",
//     };
//   }
//   return {
//     code: 200,
//     msg: "注册成功",
//     data: await User.create({ user_name: userName, ...registerInfo }),
//   };
// };

// // 登录
// export const loginUser = async (loginInfo: RegisterUser) => {
//   // 查询当前传输过来的用户密码和数据库中存储的是否一致
//   const { userName, password } = loginInfo;
//   if (!userName || !password) {
//     return {
//       code: 400,
//       msg: "用户名或密码不能为空",
//     };
//   }
//   const user = await User.findOne({
//     where: { user_name: userName, password },
//   });
//   if (!user) {
//     return {
//       code: 400,
//       msg: "用户名或密码错误",
//     };
//   }
//   // 生成token
//   const { secret, expiresIn } = JWT_CONFIG;
//   const token = sign({ userName, password }, secret, { expiresIn });
//   return {
//     code: 200,
//     msg: "登录成功",
//     data:user,
//     token
//   };
// };
