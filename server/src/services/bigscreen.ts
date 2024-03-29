import Bigscreen from "../models/Bigscreen";
// const { Op } = require("sequelize");
// import { GetUserList, User as RegisterUser } from "../types/user";
import { Bigscreen as IBigscreen } from "../types/bigscreen";

// // 查询所有用户
export const getBigscreenList = async (params: any) => {
  let { page, pageSize: limit, title, group } = params;

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
    title,
    group
  } as {
      title?: string;
      group?: string | number
  };

  if (!findParams.title) delete findParams["title"];
  if (!findParams.group) delete findParams["group"];

  return await Bigscreen.findAndCountAll({
    limit,
    offset,
    // order: [["id", "desc"]],
    where: findParams,
    // 只查询id、title、thumb字段
    attributes: ["id", "title", "thumb"],
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
const randomDefaulBgImg = () => {
  const imgArr = ["https://camo.githubusercontent.com/ce16b655807d1b67d81137f2121440d9eb5f9cf7e2543f279c0cb2f439f9a506/68747470733a2f2f696d616765732e67697465652e636f6d2f75706c6f6164732f696d616765732f323032302f303431312f3232313330375f30663861663265375f343936343831382e676966", "https://camo.githubusercontent.com/fc2545f279f1517a0e7bfdf7aa878ac572dcfd090c501f5425b2c2be0f2a0e94/68747470733a2f2f696d616765732e67697465652e636f6d2f75706c6f6164732f696d616765732f323032312f303531352f3134343431335f30333735643562645f3637333437332e706e67","https://camo.githubusercontent.com/fc2545f279f1517a0e7bfdf7aa878ac572dcfd090c501f5425b2c2be0f2a0e94/68747470733a2f2f696d616765732e67697465652e636f6d2f75706c6f6164732f696d616765732f323032312f303531352f3134343431335f30333735643562645f3637333437332e706e67", "https://camo.githubusercontent.com/2196c4a3ad7afe6e31ba79cc98e26372aee487748edf5c3c8fb4019d999f375c/68747470733a2f2f696d616765732e67697465652e636f6d2f75706c6f6164732f696d616765732f323032312f303531352f3134343530395f30666235386237665f3637333437332e706e67"]
  return imgArr[Math.floor(Math.random() * imgArr.length)]
}
// 创建大屏
export const createBigscreen = async (bigscreenInfo: IBigscreen) => {
  // 查询当前传输过来的用户密码和数据库中存储的是否一致
  const { title, description, group } = bigscreenInfo;
  if (!title || !group) {
    return {
      code: 400,
      msg: "标题和分组不能为空",
    };
  }
  // 插入数据
  const res = await Bigscreen.create({
    title,
    description,
    components: [],
    group,
    thumb: randomDefaulBgImg(),
  });
  if (res) {
    return {
      code: 200,
      msg: "创建成功",
    };
  } else {
    return {
      code: 400,
      msg: "创建失败，请稍后重试",
    };
  }
};

// 更新大屏数据
export const updateBigscreen = async (bigscreenInfo: IBigscreen) => {
  const { id, title, group } = bigscreenInfo;
  if (!id || !title || !group) {
    return {
      code: 400,
      msg: "id、标题和分组不能为空",
    };
  }
  // 插入数据
  const res = await Bigscreen.update(bigscreenInfo, {
    where: {
      id
    }
  });
  if (res) {
    return {
      code: 200,
      msg: "更新成功",
    };
  } else {
    return {
      code: 400,
      msg: "更新失败，请稍后重试",
    };
  }
};


export const queryBcDetail = async (id: number) => {
  const bigscreen = await Bigscreen.findOne({
    where: { id },
  })
  if(!bigscreen) {
    return {
      code: 400,
      msg: "此数据不存在",
    }
  }
  return bigscreen
}