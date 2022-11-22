//配置路由的地方
//引入
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
//引入路由组件Home、Login、Register、Search
// import Register from '../pages/Register'
// import Home from '../pages/Home'
// import User from '../pages/User'
import UserMsg from "../pages/User/UserMsg";
import HomePage from "../pages/HomePage";
import Editor from "../pages/Home/Editor";
import Content from "../pages/Home/Content";

import Article from "../pages/Article";

import { getToken } from "../utils/storage";
//重复点击导航时，控制台出现报错 解决如下
//先把VueRouter原型对象的push,先保存一份
const VueRouterPush = VueRouter.prototype.push;
const VueRouterReplace = VueRouter.prototype.replace;
//重写push|replace方法
//第一个参数：告诉原来push方法，你往那里跳(传递哪些参数)
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve && reject) {
    //call与appy区别
    //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call与apply传递参数用逗号隔开，apply方法执行，传递参数
    VueRouterPush.call(this, location, resolve, reject);
  } else {
    VueRouterPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function push(location, resolve, reject) {
  if (resolve && reject) {
    //成功或者失败
    //call与appy区别
    //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call与apply传递参数用逗号隔开，apply方法执行，传递参数
    VueRouterReplace.call(this, location, resolve, reject);
  } else {
    VueRouterReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//配置路由
const router = new VueRouter({
  routes: [
    {
      name: "zhuye",
      path: "/homepage",
      component: HomePage,
      // component: (resolve) => require(["../pages/HomePage"], resolve),
      meta: {
        NavShow: true,
      },
    },
    {
      name: "article",
      path: "/article/:id?",
      component: Article,
      meta: {
        NavShow: true,
      },
    },
    {
      path: "/login",
      // component: Login,
      component: (resolve) => require(["../pages/Login"], resolve),
      meta: {
        NavShow: false,
      },
    },
    {
      path: "/register",
      // component: Register,
      component: (resolve) => require(["../pages/Register"], resolve),
      meta: {
        NavShow: false,
      },
    },
    {
      path: "/home",
      // component: Home,
      component: (resolve) => require(["../pages/Home"], resolve),
      meta: {
        NavShow: true,
      },
      children: [
        {
          name: "editer",
          path: "editor",
          component: Editor,
          meta: {
            NavShow: true,
          },
        },
        {
          name: "content",
          path: "Content",
          component: Content,
          meta: {
            NavShow: true,
          },
        },
      ],
    },
    {
      path: "/user",
      // component: User,
      component: (resolve) => require(["../pages/User"], resolve),
      meta: {
        NavShow: false,
      },
      children: [
        {
          path: "/userMsg",
          component: UserMsg,
        },
      ],
    },
    {
      path: "/about",
      // component: Register,
      component: (resolve) => require(["../pages/About"], resolve),
      meta: {
        NavShow: false,
      },
    },
    //重定向，在项目跑起来的时候，访问/,立马让他定向到首页
    {
      path: "*",
      redirect: "/homepage",
    },
  ],
  // 注：scrollBehaviorhe和routes是平级的
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // if (to === "homepage") {
    return { x: 0, y: 0 };
    // }
  },
});
import { Loading } from "element-ui";
//前置路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  if (to.path === "/register") return next();
  if (to.path === "/about") return next();
  if (to.path === "/homepage") return next();
  if (to.name === "article") {
    return next();
  }
  if (!getToken()) return next("/login");
  else {
    let loadingInstance = Loading.service({
      background: "rgba(255, 255, 255, 1)",
      fullscreen: true,
      text: "数据加载中...",
    });
    setTimeout(() => {
      //函数体
      loadingInstance.close();
      next();
    }, 800);
  }
});
// router.createRouter({
//     routes,//routes是引入的,里面是路由和组件信息
//     // 注：scrollBehaviorhe和routes是平级的
//     scrollBehavior(to, from, savedPosition) {
//       // 始终滚动到顶部
//       return { top: 0 }
//     },
//   })
export default router;
