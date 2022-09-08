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
    method: "DELETE",
  });
};
// 文章详情评论接口
export const getCommentListApi = ({ source, offset = null, limit = 10 }) => {
  return request({
    url: "/v1_0/comments",
    method: "GET",
    params: {
      type: "a",
      source,
      offset,
      limit,
    },
  });
};
// 取消对文章不喜欢接口（喜欢接口）
export const getCommentLikeApi = ({ artId }) => {
  return request({
    url: `/v1_0/article/dislikes/${artId}`,
    method: "DELETE",
  });
};
// 对文章不喜欢接口（不喜欢接口）
export const getCommentUnLikeApi = ({ artId }) => {
  return request({
    url: `/v1_0/article/dislikes`,
    method: "POST",
    data: {
      target: artId,
    },
  });
};
// 获取用户个人资料
export const getUserDataApi = () => {
  return request({
    url: "/v1_0/user/profile",
  });
};
// 编辑用户照片资料
export const eidtUserPhotoDataApi = (formObj) => {
  return request({
    url: "/v1_0/user/photo",
    method: "PATCH",
    photo: formObj,
  });
};
// 编辑用户个人资料
export const changeUserDateApi = ({ name, gender, birthday, intro }) => {
  return request({
    url: "/v1_0/user/profile",
    method: "PATCH",
    data: {
      name,
      gender,
      birthday,
      intro,
    },
  });
};
// 用户 - 更新头像
export const updateUserPhotoApi = (fd) =>
  request({
    url: "/v1_0/user/photo",
    method: "PATCH",
    data:  fd , // fd外面一会儿传进来的new FormData() 表单对象

    // 如果你的请求体直接是FormData表单对象, 你也不用自己添加
    // Content-Type, axios发现数据请求体是表单对象, 它也不会转换成json字符串
    // 也不会带Content-Type: application/json, 而是交给浏览器, 浏览器发现请求体是formData会自己携带Content-Type

    // Content-Type: application/json; axios携带的, 前提: data请求体是对象 -> json字符串 -> 发给后台
    // Content-Type: multipart/form-data; 浏览器携带的, 前提: data请求体必须FormData类型对象
  });
