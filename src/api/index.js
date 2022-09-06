import request from "./request";

//所有频道接口
export const getAllChannelApi = () => {
  return request({
    url: `/v1_0/channels`,
  });
};
// 用户频道接口接口
export const getUserChannelApi = () => {
  return request({
    url: `/v1_0/user/channels`,
  });
};
// 设置频道列表接口
export const updataChannelApi = ({ channels }) => {
  return request({
    url: `/v1_0/user/channels`,
    method: "PUT",
    data: {
      channels,
    },
  });
};
// 登录接口
export const loginApi = ({ mobile, code }) => {
  return request({
    url: `/v1_0/authorizations`,
    method: "POST",
    data: {
      mobile,
      code,
    },
  });
};
// 文章列表接口
export const getArticleListApi = ({ channelId, timestamp }) => {
  return request({
    url: `/v1_0/articles`,
    method: "GET",
    params: {
      channel_id: channelId,
      timestamp: timestamp || new Date().getTime(),
    },
  });
};
// 文章详情接口
export const getArticlDetailApi = ({ artId }) => {
  return request({
    url: `/v1_0/articles/${artId}`,
  });
};
// 反馈不感兴趣接口
export const postHateApi = ({ artid }) => {
  return request({
    url: `/v1_0/article/dislikes`,
    method: "POST",
    data: {
      target: artid,
    },
  });
};
// 举报内容接口
export const reportContainApi = ({ target, type }) => {
  return request({
    url: `/v1_0/article/reports`,
    method: "POST",
    data: {
      target,
      type,
    },
  });
};
// 获取搜索联想建议接口（自动补全）
export const getSearchSuggestionApi = ({ q }) => {
  return request({
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};
// 获取搜索接口
export const searchResultApi = ({ page = 1, per_page = 10, q }) => {
  return request({
    url: "v1_0/search",
    params: {
      page,
      per_page,
      q,
    },
  });
};
// 关注用户接口
export const getAttentionApi = ({ userId }) => {
  return request({
    url: `/v1_0/user/followings`,
    method: "POST",
    data: {
      target: userId,
    },
  });
};
// 取消关注用户接口
export const concelAttentionApi = (targetId) => {
  return request({
    url: `/v1_0/user/followings/${targetId}`,
    method: "DELETE",
  });
};
// 点赞接口
export const getPraiseApi = ({ artId }) => {
  return request({
    url: "/v1_0/article/likings",
    method: "POST",
    data: {
      target: artId,
    },
  });
};
// 取消点赞接口
export const cancelGetPraiseApi = ({ artId }) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  });
};
