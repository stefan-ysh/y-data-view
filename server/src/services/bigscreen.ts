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

// 删除大屏数据
export const delBigscreen = async (id: number) => {
  console.log('[ id ] >', id)
  if (!id) {
    return {
      code: 400,
      msg: "id不能为空",
    };
  }
  // 校验用户名是否已存在
  const bigscreen = await Bigscreen.findOne({
    where: { id },
  });
  if (!bigscreen) {
    return {
      code: 400,
      msg: "此数据不存在",
    };
  }
  return {
    code: 200,
    msg: "删除成功",
    data: await Bigscreen.destroy({
      where: { id },
    })
  };
};

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
