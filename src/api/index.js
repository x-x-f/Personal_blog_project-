import requests from "./request";

import request2 from "./request2";
// import mockRequests from './mockAjax'
//三级联动的接口
///api/product/getBaseCategoryList   get  无参数
//发请求:axios发请求返回的结果是Promise对象
// export const reqCategoryList=()=>{
//     return  requests({url:'/product/getBaseCategoryList',method:'get'})
// }
//讲课老师的api,没有服务
// export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})
//--------------------------------------------------------从服务器获取数据--------------------------------------

//获取用户是否成功登录
export const reqGetLoginApi = (params) =>
  requests({
    url: "http://101.34.40.159:5005/api/login",
    method: "post",
    data: params,
  });
// https://api.uixsj.cn/hitokoto/get?type=social
// //获取每日一句
// export const reqGetWordApi = () =>
//   request2({
//     url: "https://api.uixsj.cn/hitokoto/get?type=social",
//     method: "get",
//   });
//注册用户
export const reqSendRegisterApi = (params) =>
  requests({
    url: "http://101.34.40.159:5005/api/register",
    method: "post",
    data: params,
  });
//获取用户信息
export const reqGetUserInfoApi = () =>
  requests({ url: "http://101.34.40.159:5005/my/userinfo", method: "get" });
//更新用户信息
export const reqUpdateUserInfoApi = (params) =>
  requests({
    url: "http://101.34.40.159:5005/my/userinfo",
    method: "post",
    data: params,
  });
//获取验证码
export const reqsendCodeApi = (params) =>
  requests({
    url: "http://101.34.40.159:5005/api/send",
    method: "post",
    data: params,
  });
//获取书籍分类
export const reqgetCatesApi = () =>
  requests({
    url: "http://101.34.40.159:5005/api/article/cates",
    method: "get",
  });
//获取文章信息列表
export const reqgetArticleListApi = (data) =>
  requests({
    url: "http://101.34.40.159:5005/api/article/get" + "?" + data,
    method: "get",
  });
//获取文章信息列表
export const reqgetArticleHotListApi = () =>
  requests({
    url: "http://101.34.40.159:5005/api/article/getHot",
    method: "get",
  });
//获取文章搜索列表
export const reqgetArticleSearchApi = (data) =>
  requests({
    url: "http://101.34.40.159:5005/api/article/search" + "?" + data,
    method: "get",
  });
//通过id获取作者信息
export const reqgetAuthorApi = (id) =>
  requests({
    url: "http://101.34.40.159:5005/api/article/getAuthor/" + id,
    method: "get",
  });
//通过id获取文章分类信息
export const reqgetCateApi = (id) =>
  requests({
    url: "http://101.34.40.159:5005/api/article/cates/" + id,
    method: "get",
  });
//请求具体某一篇文章
export const reqgetArticleApi = (id) =>
  requests({
    url: "http://101.34.40.159:5005/api/article/getArticle/" + id,
    method: "get",
  });
//上传文章草稿到服务器
export const reqSendArticleDraftApi = (params) =>
  requests({
    url: "http://101.34.40.159:5005/my/article/add",
    method: "post",
    data: params,
  });
//通过id获取文章
export const reqgetArticleDraftApi = (id) =>
  requests({
    url: "http://101.34.40.159:5005/my/article/get/" + id,
    method: "get",
  });
//通过id删除草稿箱文章
export const reqdeleteArticleDraftApi = (id) =>
  requests({
    url: "http://101.34.40.159:5005/my/article/delete/" + id,
    method: "get",
  });
//发布文章
export const reqReleaseArticleApi = (params) =>
  requests({
    url: "http://101.34.40.159:5005/my/article/release",
    method: "post",
    data: params,
  });
//获取个人用户文章信息
export const reqgetUserArticleApi = () =>
  requests({
    url: "http://101.34.40.159:5005/my/UserArticle/getUserArticle",
    method: "get",
  });
//通过id删除用户文章信息
export const reqdeleteUserArticleApi = (id) =>
  requests({
    url: "http://101.34.40.159:5005/my/UserArticle/deleteUserArticle/" + id,
    method: "get",
  });
//--------------------------------------------------------从本地获取数据-------------------------------------
// //获取用户是否成功登录
// export const reqGetLoginApi = (params) =>
//   requests({
//     url: "http://localhost:5005/api/login",
//     method: "post",
//     data: params,
//   });
// // https://api.uixsj.cn/hitokoto/get?type=social
// //获取每日一句
// export const reqGetWordApi = () =>
//   request2({
//     url: "https://api.uixsj.cn/hitokoto/get?type=social",
//     method: "get",
//   });
// //注册用户
// export const reqSendRegisterApi = (params) =>
//   requests({
//     url: "http://localhost:5005/api/register",
//     method: "post",
//     data: params,
//   });
// //获取用户信息
// export const reqGetUserInfoApi = () =>
//   requests({ url: "http://localhost:5005/my/userinfo", method: "get" });
// //更新用户信息
// export const reqUpdateUserInfoApi = (params) =>
//   requests({
//     url: "http://localhost:5005/my/userinfo",
//     method: "post",
//     data: params,
//   });
// //获取验证码
// export const reqsendCodeApi = (params) =>
//   requests({
//     url: "http://localhost:5005/api/send",
//     method: "post",
//     data: params,
//   });
// //获取书籍分类
// export const reqgetCatesApi = () =>
//   requests({ url: "http://localhost:5005/api/article/cates", method: "get" });
// //获取文章信息列表
// export const reqgetArticleListApi = (data) =>
//   requests({
//     url: "http://localhost:5005/api/article/get" + "?" + data,
//     method: "get",
//   });
// //获取文章信息列表
// export const reqgetArticleHotListApi = () =>
//   requests({
//     url: "http://localhost:5005/api/article/getHot",
//     method: "get",
//   });
// //获取文章搜索列表
// export const reqgetArticleSearchApi = (data) =>
//   requests({
//     url: "http://localhost:5005/api/article/search" + "?" + data,
//     method: "get",
//   });
// //通过id获取作者信息
// export const reqgetAuthorApi = (id) =>
//   requests({
//     url: "http://localhost:5005/api/article/getAuthor/" + id,
//     method: "get",
//   });
// //通过id获取文章分类信息
// export const reqgetCateApi = (id) =>
//   requests({
//     url: "http://localhost:5005/api/article/cates/" + id,
//     method: "get",
//   });
// //请求具体某一篇文章
// export const reqgetArticleApi = (id) =>
//   requests({
//     url: "http://localhost:5005/api/article/getArticle/" + id,
//     method: "get",
//   });
// //上传文章草稿到服务器
// export const reqSendArticleDraftApi = (params) =>
//   requests({
//     url: "http://localhost:5005/my/article/add",
//     method: "post",
//     data: params,
//   });
// //通过id获取文章
// export const reqgetArticleDraftApi = (id) =>
//   requests({
//     url: "http://localhost:5005/my/article/get/" + id,
//     method: "get",
//   });
// //通过id删除草稿箱文章
// export const reqdeleteArticleDraftApi = (id) =>
//   requests({
//     url: "http://localhost:5005/my/article/delete/" + id,
//     method: "get",
//   });
// //发布文章
// export const reqReleaseArticleApi = (params) =>
//   requests({
//     url: "http://localhost:5005/my/article/release",
//     method: "post",
//     data: params,
//   });
// //获取个人用户文章信息
// export const reqgetUserArticleApi = () =>
//   requests({
//     url: "http://localhost:5005/my/UserArticle/getUserArticle",
//     method: "get",
//   });
// //通过id删除用户文章信息
// export const reqdeleteUserArticleApi = (id) =>
//   requests({
//     url: "http://localhost:5005/my/UserArticle/deleteUserArticle/" + id,
//     method: "get",
//   });
