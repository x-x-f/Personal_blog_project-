import Vue from "vue";
import App from "./App.vue";
//全局组件
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import CardContent from "./components/CardContent";
import CardPage from "./components/CardPage";
import CardList from "./components/CardList";
import CardHot from "./components/CardHot";
//轮播图组件
import Carousel from "./components/Carousel";
//第一参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(Navigation.name, Navigation);
Vue.component(Header.name, Header);
Vue.component(Carousel.name, Carousel);
Vue.component(CardContent.name, CardContent);
Vue.component(CardPage.name, CardPage);
Vue.component(CardList.name, CardList);
Vue.component(CardHot.name, CardHot);

//引入路由
import router from "./router";

import store from "./store";

// 引入 mavon-editor
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// 挂载全局
Vue.use(mavonEditor);

//引入showdown
import showdown from "showdown";
Vue.use(showdown);
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

// 代码高亮
Vue.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});
//是否全屏插件
import screenfull from "screenfull";
Vue.use(screenfull);

import VueLazyload from "vue-lazyload";
//使用vue-lazyload插件，图片懒加载
Vue.use(VueLazyload);
//建议自定义配置插件，设置相应的loading图和图片错误显示的统一图片
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: require("../src/assets/lazy/error.png"),
  // loading: require("../src/assets/lazy/loading.gif"),
  loading: require("../src/assets/lazy/error.png"),
  attempt: 1,
});

//引入数字动画库插件
import VueAnimateNumber from "vue-animate-number";
Vue.use(VueAnimateNumber);

//引入element-ui(按需引入)
import {
  Button,
  Row,
  Container,
  header,
  Aside,
  Main,
  Footer,
  Tree,
  PageHeader,
  Descriptions,
  DescriptionsItem,
  Tag,
  Message,
  Tabs,
  TabPane,
  Upload,
  Avatar,
  Col,
  Card,
  Divider,
  Form,
  FormItem,
  Input,
  Empty,
  Dropdown,
  Table,
  DropdownMenu,
  DropdownItem,
  Skeleton,
  SkeletonItem,
  Select,
  Dialog,
  Option,
  TableColumn,
  Tooltip,
  MessageBox,
  Autocomplete,
} from "element-ui";
Vue.component(TableColumn.name, TableColumn);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Autocomplete.name, Autocomplete);

//使用element-ui
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(Container.name, Container);
Vue.component(header.name, header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Footer.name, Footer);
Vue.component(Tree.name, Tree);
Vue.component(PageHeader.name, PageHeader);
Vue.component(Descriptions.name, Descriptions);
Vue.component(DescriptionsItem.name, DescriptionsItem);
Vue.component(Tabs.name, Tabs);
Vue.component(Tag.name, Tag);
Vue.component(TabPane.name, TabPane);
Vue.component(Upload.name, Upload);
Vue.component(Avatar.name, Avatar);
Vue.component(Col.name, Col);
Vue.component(Card.name, Card);
Vue.component(Divider.name, Divider);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Empty.name, Empty);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Table.name, Table);
Vue.component(Skeleton.name, Skeleton);
Vue.component(SkeletonItem.name, SkeletonItem);
Vue.component(Select.name, Select);
Vue.component(Dialog.name, Dialog);
Vue.component(Option.name, Option);

//引入消息提示框
Vue.component(Message);
//Vue原型对象上加一个$message
Vue.prototype.$message = Message;

Vue.prototype.$confirm = MessageBox.confirm;
//引入ElementUI组件库
// import ElementUI from 'element-ui';
// Vue.use(ElementUI)
//引入ElementUI全部样式
// import 'element-ui/lib/theme-chalk/index.css';

//引入swiper样式和js，全局可用
import "swiper/dist/css/swiper.min.css";
import "swiper/dist/js/swiper.min.js";

//测试接口
// import {reqCategoryList} from './api'
// reqCategoryList()
// import {reqGetSearchInfo} from './api'
// console.log(reqGetSearchInfo({name:'手机'}))

Vue.config.productionTip = false;

new Vue({
  //注册
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    //安装全局事件总线
    Vue.prototype.$bus = this;
  },
  //注册路由的信息，组件身上都拥有了$route和$router属性
  router,
  //注册仓库：组件实例的身上会多了一个属性$store.
  store,
});
