const key = "tokenValue";

// 设置token方法
export const setToken = (token) => {
  localStorage.setItem(key, token);
};

// 获取token方法
export const getToken = () => {
  return localStorage.getItem("token");
};

// 移除token方法
export const removeToken = () => {
  return localStorage.removeItem("token");
};
