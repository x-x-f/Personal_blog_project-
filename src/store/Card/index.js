//Card模块的小仓库
import { reqgetCatesApi } from "@/api"
const state = {
    catesList:[]
}
const actions = {
    async getCates(context) {
        const result= await reqgetCatesApi()
        // console.log(result)
        if(result.status) return console.log('失败')
        // console.log('成功',result.data)
        context.commit('GETCATES',result.data)
    }
}
const mutations = {
    GETCATES(state,value){
        // console.log('填入数据成功！')
        state.catesList=value;
        // console.log(state.catesList)
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