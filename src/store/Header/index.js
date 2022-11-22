//Header模块的小仓库
import { reqGetWordApi } from "@/api"
const state = {
    word:'哦哦哦'
}
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getWordList(context) {
        // console.log(params)
        let result= await reqGetWordApi()
        // console.log(result)
        context.commit('GETWORDLIST',result)
    },
}
const mutations = {
    GETWORDLIST(state,value) {
        state.word=value
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