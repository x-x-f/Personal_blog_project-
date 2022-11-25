import Vue from "vue";
import Vuex from "vuex";
//使用插件一次
Vue.use(Vuex);
//引入小仓库
import Login from "./Login";
import Card from "./Card";
import Homepage from "./Homepage";
//对外暴露store的实例
export default new Vuex.Store({
  modules: {
    Login: Login,
    Card: Card,
    Homepage: Homepage,
  },
});
