//UserLogin模块的小仓库
import { reqGetLoginApi, reqGetUserInfoApi } from "@/api"
import { saveToken, getToken, delToken } from '../../utils/storage'
const state = {
    //state中数据默认初始值不能乱写
    //获取localStorage中的token,如果不存在则为空
    tokenInfo: getToken() || null,
    userMsg: { username: 0, nickname: '' },
    login: 1,
    errors: []
}
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async sendLogin(context, value) {
        // 验证用户的密码，等待服务器返回数据
        let result = await reqGetLoginApi(value)
        // console.log(result)
        if (!result.status) {
            //保存服务器返回的token
            saveToken(result.token)
            //同时向服务器请求用户的基本信息
            let results = await reqGetUserInfoApi()
            // console.log(results)
            if (results.status) return context.commit('ERRORS', results.message)
            //返回数据成功
            const arr = { token: result.token, user: results.data }
            // console.log('@', results.data)
            localStorage.setItem('userMsg', JSON.stringify(results.data))
            // console.log(arr)
            context.commit('SENDLOGIN', arr)
        } else {
            // this.$message.error('登录失败！' + result.message)
            // console.log('账号或密码错误！')
            context.commit('ERRORS', result.message)
            // console.log('账号或密码错误！')
        }
    },
    //如果有token,使用token尝试获取数据,服务器返回失败，则删除本地token提醒用户信息失效，重新登录重新登录
    async reqGetLoginInfo(context) {
        let result = await reqGetUserInfoApi()
        // console.log(result)
        //返回数据失败！
        if (result.status) {
            //如果失效，直接删除
            delToken()
            //删除本地存储的用户信息
            localStorage.removeItem('userMsg')
            //退出并提醒
            context.commit('ERRORS', '登录信息已失效！请重新登录')
        } else {
            //返回用户数据成功！
            localStorage.setItem('userMsg', JSON.stringify(result.data))
            context.commit('REQGETLOGININFO', result.data)
        }

    },
    //清空已登录信息
    isLogined(context) {
        localStorage.removeItem('userMsg')
        context.commit('ISLOGINED')
    }
}
const mutations = {
    SENDLOGIN(state, arr) {
        state.tokenInfo = arr.token
        state.userMsg = arr.user
        state.login += 1
    },
    REQGETLOGININFO(state, user) {
        state.userMsg = user
        state.login += 1
    },
    ERRORS(state, value) {
        state.errors.push(value)
    },
    ISLOGINED(state, value) {
        state.userMsg = { username: 0, nickname: '' }
    }
}
const getters = {

}
export default {
    state,
    actions,
    mutations,
    getters
}