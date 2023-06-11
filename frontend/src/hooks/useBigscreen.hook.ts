import BigscreenApi from "@/api/bigscreen";
import { useBigscreenStore } from "@/stores";
export const useBigscreen = () => {
  const getBigscreenList = async (params: {
    page: number;
    pageSize: number;
    title: string;
    group?: number | string 
  } = { page:1, pageSize: 10, title: '', group: '' }) => {
    window.$message.loading("加载中...");
    const res = await BigscreenApi.getBigscreenList(params);
    if (res.code === 200) {
      window.$message.destroyAll()
      const b = useBigscreenStore();
      b.total = res.data.total;
      b.setBigscreenList(res.data.list);
    } else {
      window.$message.destroyAll()
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

  const getGroupList = async () => {
    const res = await BigscreenApi.getGroupList();
    if(res.code === 200) {
      const b = useBigscreenStore()
      b.setGroupList(res.data)
      b.setCurGroup(res.data[0]?.id || '')
    } else {
      window.$message.error(res.msg)
    }
  }

  return {
    getBigscreenList,
    createBigscreen,
    getGroupList,
    delBigscreen
  };
};
