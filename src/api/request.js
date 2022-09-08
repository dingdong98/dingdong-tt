// 基于axios封装的请求模块
import theAxios from "axios";
import { Notify } from "vant";
import router from "@/router";
import { getToken, removeToken } from "@/utils/aboutToken";

// 创建一个新的axios实例
const axios = theAxios.create({
  baseURL: "https://toutiao.itheima.net/", //基地址
});

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 请求携带token- 判断本地有token且具体网络请求没有携带token，再添加
    if (getToken() && config.headers.Authorization === undefined) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // 401代表身份认证过期
    if (error.response.status === 401) {
      Notify({ type: "warning", message: "身份过期" });
      removeToken();
      router.replace("/login");
    } else if (error.response.status === 500) {
      //服务器内部出错
      Notify({ type: "danger", message: "服务器错误" });
    }
    return Promise.reject(error);
  }
);
// 导出自定义函数，参数对象解构赋值
export default ({ url, method = "GET", params, data, headers }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers,
  });
};
