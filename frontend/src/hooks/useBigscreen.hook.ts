import BigscreenApi from "@/api/bigscreen";
import { useBigscreenStore } from "@/stores";
export const useBigscreen = () => {
  const getBigscreenList = async (params: {
    page: number;
    pageSize: number;
    title: string;
  } = { page:1, pageSize: 10, title: '' }) => {
    const res = await BigscreenApi.getBigscreenList(params);
    if (res.code === 200) {
      const b = useBigscreenStore();
      b.total = res.data.total;
      b.setBigscreenList(res.data.list);
    } else {
      // return Promise.reject(res.msg);
      console.log('[ "出错了" ] >', "出错了");
    }
  };
  const createBigscreen = async (params: {
    title: string;
    description: string;
  }) => {
    const res = await BigscreenApi.createBigscreen(params);
    //使用 promise 返回，以便捕捉
    return Promise.resolve(res);
  };
  const delBigscreen = async (id: number) => {
    const res = await BigscreenApi.delBigscreen(id);
    //使用 promise 返回，以便捕捉
    return Promise.resolve(res);
  };

  return {
    getBigscreenList,
    createBigscreen,
    delBigscreen
  };
};
