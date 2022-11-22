import Vue from "vue";
import Vuex from "vuex";
//使用插件一次
Vue.use(Vuex);
//引入小仓库
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Card from "./Card";
import Homepage from "./Homepage";
//对外暴露store的实例
export default new Vuex.Store({
  modules: {
    Login: Login,
    Header: Header,
    Home: Home,
    Card: Card,
    Homepage: Homepage,
  },
});
