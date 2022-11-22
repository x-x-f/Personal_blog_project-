//对axios进行二次封装
import axios from "axios";

import { getToken } from "../utils/storage";
//引入进度条
import nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";
//start：进度条开始  done:进度条结束

import { MessageBox, Message } from "element-ui";

//1、利用axios对象的方法create,去创建一个axios实例
//2、request就是axios,只不过配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发送请求的时候，路径当中会出现api
  // baseURL:"/api",
  //代表请求超时的时间
  timeout: 4000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事
requests.interceptors.request.use((config) => {
  //config：配置对象，对象里面有一个属性很重要，header请求头
  //进度条开始动
  nprogress.start();
  // let token = window.localStorage.getItem("my-token")
  let token = getToken();
  // console.log(getToken())
  if (token) {
    // headers: { 'Authorization': 'Bearer ' + getToken() }
    config.headers.Authorization = token; //将token放到请求头发送给服务器
    //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
    // config.headers['accessToken'] = Token;
  }
  return config;
});

//引入防抖
const debounce = (() => {
  let timer = null;
  return (callback, wait) => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
})();

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数，服务器相应的数据回来以后，响应拦截器可以检测到，做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    // console.log(error.message==='Network Error')
    debounce(() => {
      Message({
        showClose: true,
        message: "服务器响应超时!", //弹出失败原因error.message
        type: "error",
      });
    }, 3000);
    // return Promise.reject(new error('faile失败'))
    // return this.$message.error()
  }
);

//对外暴露
export default requests;
