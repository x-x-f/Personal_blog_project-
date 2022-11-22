//对axios进行二次封装
import axios from 'axios'

import {getToken} from '../utils/storage'
//引入进度条
import nprogress from 'nprogress'
//引入进度条的样式
import "nprogress/nprogress.css"
//start：进度条开始  done:进度条结束
const request2 = axios.create({
    //基础路径，发送请求的时候，路径当中会出现api
    // baseURL:"/api",
    //代表请求超时的时间
    timeout: 5000,
})
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事
request2.interceptors.request.use((config) => {
    //config：配置对象，对象里面有一个属性很重要，header请求头
    //进度条开始动
    nprogress.start()
    return config
})

//响应拦截器
request2.interceptors.response.use((res) => {
    //成功的回调函数，服务器相应的数据回来以后，响应拦截器可以检测到，做一些事情
    //进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})



//对外暴露
export default request2