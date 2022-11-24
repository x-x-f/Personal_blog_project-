//Homepage模块的小仓库
import { reqgetArticleApi } from "@/api/index";
import showdown from "showdown";
let converter = new showdown.Converter();
// 显示表格
converter.setOption("tables", true);
const state = {
  article: {
    title: "",
    htmlText: "",
    pub_date: "",
    author: "",
  },
};
const actions = {
  async getArticle(context, id) {
    const result = await reqgetArticleApi(id);
    if (result.status) {
      console.log("信息获取失败");
    }
    // console.log(result.data[0]);
    // this.htmlText = converter.makeHtml(result.data[0].content);
    context.commit("GETARTICLE", result.data[0]);
  },
};
const mutations = {
  GETARTICLE(state, value) {
    state.article.htmlText = converter.makeHtml(value.content);
    state.article.title = value.title;
    state.article.pub_date = value.pub_date;
  },
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
