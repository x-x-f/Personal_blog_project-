//Homepage模块的小仓库
import { reqgetArticleApi, reqgetCateApi } from "@/api/index";
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
    visit_number: "",
    cate_id: "",
    cate_name: "",
  },
};
const actions = {
  //发送文章请求
  async getArticle(context, id) {
    const result = await reqgetArticleApi(id);

    if (result.status) {
      console.log("信息获取失败");
    }
    const result2 = await reqgetCateApi(result.data[0].cate_id);
    if (result2.status) {
      console.log("信息获取失败");
    }
    context.commit("GETARTICLE", [result.data[0], result2.data[0]]);
  },
};
const mutations = {
  GETARTICLE(state, value) {
    state.article.htmlText = converter.makeHtml(value[0].content);
    state.article.title = value[0].title;
    state.article.pub_date = value[0].pub_date;
    state.article.visit_number = value[0].visit_number;
    state.article.cate_id = value[0].cate_id;
    state.article.cate_name = value[1].name;
  },
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
