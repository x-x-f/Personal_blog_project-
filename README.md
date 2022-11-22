# app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## 1 前期
node+webpack+淘宝镜像

nodemodules文件夹：项目依赖文件夹
public文件夹：一般放置一些静态资源(资源)，webpack会原封不动打包到dist文件夹中

src源代码文件夹
   assets文件夹，一般也是放置静态资源（一般放置多个组件共用的静态资源），这里面的静态资源，在webpack打包时，webpack会把静态资源当做一个模块，打包到js文件里
   components文件夹：一般放置的是非路由组件（全局组件）
   App.vue:唯一的根组件，Vue当中的组件（.vue）
   main.js:程序入口文件，也是整个程序中最先执行的文件

babel.config.js:配置文件（babel相关）

package.json:认为项目身份证，记录项目叫做什么，项目中有哪些依赖，项目怎么运行

package-lock.json:缓存性的文件

## 2 前期准备
在根目录下创建vue.config.js

lintOnSave:false, //关闭语法检查

src配置别名
"compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }

## 3、项目路由分析
vue-router
前端路由所谓路由：kv键值对
key:URL
value：相应的路由组件
注意上中下结构


路由组件：
Home首页路由组件，Search搜索路由组件、login路由、register注册路由
非路由组件：
Header [首页、搜索]
Footer [首页、搜索]，但是登陆/注册页面没有

## 4、完成非路由组件Header\Footer设计



## 5、路由组件的搭建
vue-router
安装 npm i vue-router@3    (vue2需要安装vue-router@3  ,   vue3是 vue-router@4)


路由组件应该有四个：Home、Search、Login、Register
路由组件经常放置在pages

### 5.1配置路由：
一般放置在router文件夹中

### 5.2总结
路由组件与非路由组件的区别
1：路由组件一般是放在pages/views文件夹中，非路由组件一般放在components中
2：路由组件一般需要在router文件夹中进行注册（使用的即为是组件的名字），非路由组件
一般是以标签的形式使用


$route和$router属性
$route：一般获取路由信息[路径，query、params等等 meta]
$router：一般是进行编程式导航进行路由跳转（push/replace）


5.3路由的跳转
有两种形式
声明式导航：router-link
编程式导航：push/replace

编程式导航：声明式导航能做的，编程式导航都能做
但是编程式导航除了路由跳转，还可以做一些其他业务逻辑


5.6、Footer组件的显示与隐藏
显示或影藏组件：v-if(频繁操作dom,消耗性能)||v-show(更好一些)
Footer组件在Home,Search显示Footer组件
Footer组件在login，register的时候隐藏

## 6 路由
6.1、可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示隐藏

6.2、配置的路由的时候，可以给路由添加路由元信息[meta]，路由需要配置对象，它的key不能乱写


8)路由传参
A->B
声明式导航router-link(务必要有to属性)
编程式导航：利用组件实例的$router.push|replace方法，还可以做一些其他业务逻辑

params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位 //(没有占位,当刷新页面时,会造成数据丢失 )
query参数：不属于路径当中的一部分，类似于ajax中的queryString  /home?k=v&kv=,不需要占位



1)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；
//重复点击导航时，控制台出现报错 解决如下
//先把VueRouter原型对象的push,先保存一份
const VueRouterPush = VueRouter.prototype.push
const VueRouterReplace = VueRouter.prototype.replace
//重写push|replace方法
//第一个参数：告诉原来push方法，你往那里跳(传递哪些参数)
VueRouter.prototype.push = function push (location,resolve,reject) {
    if(resolve && reject)
    {
        //call与appy区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数用逗号隔开，apply方法执行，传递参数
        VueRouterPush.call(this,location,resolve,reject);
    }else{
        VueRouterPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function push (location,resolve,reject) {
    if(resolve && reject) //成功或者失败
    {
        //call与appy区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数用逗号隔开，apply方法执行，传递参数
        VueRouterReplace.call(this,location,resolve,reject);
    }else{
        VueRouterReplace.call(this,location,()=>{},()=>{})
    }
}



2)将Home组件的静态组件拆分
2.1静态页面（样式）
2.2拆分静态组件
2.3发请求获取服务器数据进行展示
2.4开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件


3)三级联动组件完成
---由于三级联动，在Home,Search,Detail，把三级联动注册为全局组件
只需要注册一次，就可以中项目的任意地方使用




3)axios二次封装
AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理
2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的



接口统一管理




### 跨域问题
什么是跨域：协议，域名，端口号不同请求，称之为跨域


### nprogress进度条的的使用

start：进度条开始  
done:进度条结束

进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的





### 3:vuex

当项目比较大，组件通信数据比较复杂，这种情况在使用vuex

Vuex是插件，通过vuex仓库进行存储项目的数据



1)vuex模块式开发【modules】
由于项目体积比较大，你向服务器发请求的接口过多，服务器返回的数据也会很多，如果还用以前的方式存储数据，导致vuex中的state数据格式比较复杂。采用vuex模块式管理数据。
Vuex核心概念:state、actions、mutations、getters、modules

{
    state：{
         a:1,
         b:2,
         c:[],
         d:{}
    }
}

//模块式开发
{
    state:{
        home:{a:1},
        search:{},
        detail:{}
    }
}


### 商品分类三级联动展示动态数据

完成TypeNav三级联动展示数据业务

以前基础课程的时候，发请求操作如下：在组件的mounted中书写axios.get||post,获取到数据存储到组件的data当中进行使用


你们写项目的时候发请求在哪里发呀？
mounted|created:都可以

mounted：模板已经变为真是DOM【只不过没有数据，显示空白】，因为ajax是异步，需要时间的。
created：稍微好那么一丢丢（不算啥）


3)商品分类数据猜想？

[
    {
        id:1,categoryName:'图书',
        child:[
             {id:3.14,
              categoryName:'影像'，
              child:[
                   {id:4,categoryName:'华为'}
              ]
             }
        ]
    }
]


4)完成动态展示商品分类的数据




### 5)完成一级分类的背景效果
第一种解决方案：CSS  hover 怎么接单怎么来
.item:hover{
                background: skyblue;
            }
不采用这种方式
第二种解决方案：js解决

<!-- 事件的委派（事件代理）-委派给父元素 -->
<div @mouseleave="leaveIndex">
    <h2 class="all">全部商品分类</h2>
    <!-- 三级联动 -->
    <div class="sort">
        <div class="all-sort-list2">
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                动态绑定cur(只有currentIndex===index时) 这个div(item)才会有cur这个样式
                :class="{cur:currentIndex===index}">
                <h3 @mouseenter="changeIndex(index)">

//鼠标进入修改响应式数据currentIndex
        changeIndex(index) {
            //index:鼠标移上某一个一级分类的元素的索引值
            this.currentIndex = index
        },
        //一级分类鼠标移出的事件问题
        leaveIndex() {
            //鼠标移出currentIndex,变为-1
            this.currentIndex = -1
        }

.cur {
    background: skyblue;
}


### 6)完成动态展示2|3联动结构
js动态绑定style样式(没有使用hover)
 :style="{display:currentIndex===index?'block':'none'}"






7)演示卡顿现象
//正常情况（用户慢慢操作）：每一个一级分类h3,都会触发事件
//非正常情况（用户操作很快）：本身全部每一个一级分类h3都应该触发鼠标进入事件都会触发事件，但是经过测试，只有部分h3出发了
//就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数有大量业务，有可能出现卡顿现象

函数的防抖与节流

防抖:前面的所有触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

//引入方式：是把lodash全部功能函数引入
// import _ from 'lodash'
//最好的引入的方式：按需加载
import throttle from "lodash/throttle"


//鼠标进入修改响应式数据currentIndex
// changeIndex(index) {
//     //index:鼠标移上某一个一级分类的元素的索引值
//     //正常情况（用户慢慢操作）：每一个一级分类h3,都会触发事件
//     //非正常情况（用户操作很快）：本身全部每一个一级分类h3都应该触发鼠标进入事件都会触发事件，但是经过测试，只有部分h3出发了
//     //就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数有大量业务，有可能出现卡顿现象
//     this.currentIndex = index
// },
//throttle回调函数别用箭头函数，可能会出现上下文this出现问题
changeIndex:throttle(function(index){
    this.currentIndex = index
},30),



### 三级联动组件的路由跳转与传递参数

三级联动用户可以点击的：一级分类，二级分类，三级分类
点击时，home模块跳转到Search模块，一级会把用户选中的产品（name，id）,在路由跳转的时候，进行传递
声明式导航：router-link
编程式导航：push|replace

三级联动：如果使用声明式导航router-link,可以实现路由的跳转与传递参数

router-link:可以一个组件
当服务器的数据返回之后，循环出很多的router-link组件【创建组件实例】创建组件实例比较耗内存，因此可能出现卡顿现象
第一种：
<router-link to="/search">{{c2.categoryname}}</router-link>
第二种：
<a @click="goSearch">{{c1.categoryname}}</a>
    goSearch(){
                this.$router.push('/search')
            }
第三种:事件的委派
this.$router.push({
    name:"search",
    query:{categoryName:'xxx',2id:'xx'}
})
<!-- 利用事件的委派+编程式导航实现路由的跳转与传递参数 -->
<div class="all-sort-list2"  @click="goSearch"> 
一级分类
<a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
二级分类
<a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
三级分类
<a :data-categoryName="c3.categoryName"  :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>


//进行路由跳转的方法
goSearch(event){
    //最好的解决方案：编程式导航+事件的委派
    //利用事件的委派存在一些问题：
    //1、点击的一定是a标签  2、如何获取参数（如何区分1、2、3级分类的产品的名字id）
    //第一个问题：把子节点当中a标签，我加上自定义属性data-categoryName,其余节点没有
    let Element=event.target
    //获取到当前触发这个事件的节点【h3,dt,a,dl】,需要带有data-categoryName这样节点【一定是a标签】
    //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
    // console.log(Element)
    let {categoryname,category1id,category2id,category3id}=Element.dataset
    //如果标签身上拥有categoryname一定是a标签
    if(categoryname){
        //整理路由跳转的参数
        let location={name:'search'}
        let query={categoryName:categoryname}
        //一级分类、二级分类、三级分类a标签
        if(category1id){
            query.category1Id=category1id
        }else if(category2id){
            query.category2Id=category2id
        }else{
            query.category3Id=category3id
        }
        // 整理完参数（合并）
        location.query=query
        console.log(location)
        //路由跳转
        this.$router.push(location)
    }
}

### 搜索模块中的三级联动与过渡动画


1.1在home模块当中，使用了一个功能三级联动功能---->[typeNav]
1.2在search模块当中，也使用三级联动的功能------->[typeNav]
1.3注意的事项
注意1：以后在开发项目的时候，如果发现某一个组件在项目当中多个地方出现频繁的使用
咱们经常把这类的组件注册为全局组件。
注册全局组件的好处是什么那：只需要注册一次，可以在程序任意地方使用

注意2:咱们经常把项目中共用的全局组件放置于components里面，以后需要注意，
项目当中全局组件（共用的组件）一般放置于components文件夹中

注意3：全局组件只需要注册一次，就可以在项目当中任意的地方使用，注册全局组件一般是在入口文件注册。

#### Search模块中的商品分类显示隐藏
<!-- 事件的委派（事件代理）-委派给父元素 -->
<div @mouseleave="leaveShow"  @mouseenter="enterShow">
    <h2 class="all">全部商品分类</h2>
    <!-- 三级联动 -->
    <div class="sort" v-show="show">
 data() {
        return {
            //存储用户鼠标移上哪一个一级分类
            currentIndex: -1,
            show:true
        }
    },

methods:  
//当鼠标移入的时候，让商品分类列表进行显示
enterShow(){
    if(this.$route.path!='/home'){
        this.show=true
    }
},
//一级分类鼠标移出的事件问题//当鼠标移出的时候，让商品分类列表进行隐藏
leaveShow() {
    //鼠标移出currentIndex,变为-1
    this.currentIndex = -1
    //判断如果不是home组件的时候才会执行
    if(this.$route.path!='/home'){
        this.show=false
    }
},

#### 过度动画
前提组件|元素必须要有v-if|v-show指令才可以有过度动画
<transition name="sort">
</transition>
//过渡动画的样式
        //过渡动画的开始状态（进入）
        .sort-enter {
            height: 0px;
            opacity: 0;
            transform: rotate(180deg);
        }

        //过渡动画的结束状态（进入）
        .sort-enter-to {
            height: 461px;
            opacity: 1;
            transform: rotate(360deg);
        }

        .sort-leave {
            height: 461px;
            opacity: 1;
        }

        .sort-leave-to {
            height: 0px;
            opacity: 0;
        }

        //定义动画的时间、速率
        .sort-enter-active {
            transition: all 0.5s linear;
        }

        //定义动画的时间、速率
        .sort-leave-active {
            transition: all 0.5s linear;
        }


### 合并params参数与query参数





### 开发Home首页当中的ListContainer组件与Floor组件
但是一件事情：服务器返回的数据只有商品分类菜单数据，对上两个组件服务器没有提供数据
mock数据（模拟）：如果你想mock数据，需要用到一个插件mockjs

使用：
1、在项目src文件夹中创建mock文件夹
2、准备json数据(mock文件夹中创建相应的JSON文件)-----格式化一下，别留有空格（跑不起来的）
3、把mock数据需要的图片放置到public文件夹中【public文件夹在打包的时候，会把相应的资源原封不动的大包到dist文件夹中】
4、开始mock（虚拟的数据了），通过mockjs模块实现
 创建mockServe.js通过mock.js插件实现模拟数据
5、mockServer.js文件在人口文件中引入（至少需要执行一次，才能模拟） 


#### ListContainer组件的重点
安装swiper5 ，没用安装@4


### 轮播图问题
//newSwiper实例放在mounted这里为什么不行
        //因为dispatch当中涉及到了异步语句，导致v-for遍历的时候结构还没有完全，因此不行
        // 轮播图 · 初始化设定
        //最笨的方法，定时器二秒之后执行
        setTimeout(() => {
            //函数体
            console.log('newswiper实例')
            var swiper = new Swiper('.swiper-container', {
                loop: true,
                spaceBetween: 30,
                effect: 'fade',
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false, // 取消鼠标操作后的轮播暂停【无操作轮播继续】【参考链接1】
                    stopOnLastSlide: false, // 在最后一页停止
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

            });
        }, 2000)
 //newSwiper实例放在mounted这里为什么不行
        //因为dispatch当中涉及到了异步语句，导致v-for遍历的时候结构还没有完全，因此不行
        //还没有获取到数据，swiper就已经初始化了
        // 轮播图 · 初始化设定
        //最笨的方法，定时器二秒之后执行（异步语句）不推荐
        // setTimeout(() => {
        //     //函数体
        // }, 2000)
        //通过watch监听已有数据的变化
最完美的解决方案：解决轮播图问题
watch+nextTick：数据监听：监听已有数据的变化
// nextTick在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。


### 开发floor组件
切记仓库中的state的数据格式，你别瞎写，乱写，数据格式取决于服务器返回的数据
2、1 getFloorList这个actions在哪里触发，是需要在home路由组件当中发的，不能再floor组件内部发action,因为我们需要v-for遍历floor组件
去她上一级组件，home

2。2 v-for可以在自定义标签上使用

2.3 组件通信的方式有哪些？ 面试频率极高
props:用于父子通信
自定义事件：@on  @emit 可以实现子给父通信
全局事件总线 $bus
pubsub-js:vue当中几乎不用 全能
插槽
vuex

## 把首页当中的轮播图差分为一个共用的全局组件
切记L以后在开发项目的时候，如果看到某一个组件在很多地方使用，把它变成全局组件
注册一次，可以在任意地方使用，公用的组件|非路由组件放到components文件夹中



## search模块的开发
复习:重点
1:swiper|lodash|moment插件工作的时候经常使用----【API：有时间翻看一下】
2:$nextTick,组件实例的方法。
在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。



1)合并参数*****
为什么需要合并参数（query|params）:因为这些参数，对于search是有用的，因为search通过这些参数
向服务器发请求，需要把这些参数携带给服务器，服务器就会返回相应的用户的搜索的数据，search就可以进行展示。

1.1:开发的三级联动业务，当你点击a标签的时候，会进行路由的跳转，将产品的名字与id传递给search模块----（query）
1.2:点击搜索按钮的时候，用户输入进来的关键字，点击按钮的时候会通过params参数传递给search模块-----（params）
1.3路由跳转（home->search）,两个地方，三级联动（typeNav）、Header组件（搜索按钮）

2)完成search静态组件
项目节点:学习的并不是基础的语法，'套路'
再次提醒：组件通信很重要-----【七种组件通信：务必要会】
接下来开发search搜索模块：注意在老师给你们的文件夹中有search静态组件，复制过来即可。
2.1书写静态页面【布局、样式】
2.2拆分组件
2.3获取服务器数据展示数据
2.4玩业务

//是搜索模块需要携带给接口的参数
{
  "category1Id": "61",//一级分类的id
  "category2Id": "61",//二级分类的id
  "category3Id": "61",//三级分类的id
  "categoryName": "手机",//产品的名字
  "keyword": "小米",//关键字
  "order": "1:desc",//排序
  "pageNo": 1,//当前第几页
  "pageSize": 10,//每一页需要展示多少条数据
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],//平台属性的选择参数
  "trademark": "4:小米"//品牌参数
}

注意：搜索的接口，需要传递参数，至少是一个空对象（KV没有，但是至少给服务器一个对象）
3)获取search模块数据
4)展示商品列表数据


5)根据用户的搜索条件展示不同的数据。

根据前台传递参数决定的
根据不同条件，展示不同的数据。----->取决于后台返回的数据


1:发请求，获取搜索模块的数据
2:根据用户搜索的条件携带参数给服务器，展示用户搜索的内筒



开发遇见问题:用户条件可以发生多次变化，但是咱们的请求，只是会发一次【mounted中书写的】


请求的性能优化:
发一个请求，需要向服务器携带参数：带100个参数   带1参数  【消耗宽带】
对于给服务器携带的参数：如果数值为undefind，向服务器发请求的时候，参数步携带给服务器的


## 获取到search模块的数据
2：对于商品的展示
3:对于关键字、三级联动的面包屑展示业务

学会套路最重要:
套路1:路由自己跳自己----修改路由
套路2：watch监听路由的变化发请求


切记：自己写项目的时候，切记进行单元测试---【完成一个功能：要验证是否OK】
      在你写项目的时候，锻炼自己解决bug问题--【别遇见红色就怕】

### 品牌与平台属性的数据进行动态展示
tradeMark---品牌
举例子:理解平台属性 【用户购买一个手机】
颜色【平台属性】:红色、白色、紫色【平台属性值】
价格【平台属性】：1299,6999,899【平台属性值】
操作系统【平台属性】：window、linux【平台属性值】
//看见页面结构，大概能知道数据结构什么样子的
尺寸: 中、短
材料：塑料、涤纶
[
    {attrId:1,attrName:尺寸,attrValueList:['中','短']},
    {attrId:2,attrName:材料,attrValueList:['塑料','涤纶']},
]

### 动态开发面包屑中的分类名
编程是导航路由跳转【自己跳自己】

### 动态开发面包屑中的关键字
当面包屑中的关键字清楚以后，需要让兄弟组件header中的关键字清除
设计组件通信：
props：父子
自定义事件：子父
vuex:万能
插槽：父子
pubsub-js:万能
$bus:全局事件总线

### 完成品牌  与  平台属性的业务
2.1刚刚我们只是把服务器的数据动态展示，但是需要注意，对于品牌|平台属性、用户可以点击的【小米、苹果】|平台属性
2.2我们还是需要收集用户选择的数据，把用户选择的数据信息，给服务器传递获取，获取相应的数据进行展示
2.3组件通信-----（工作使用频率非常高、面试的时候经常出现）
父子:props、插槽、ref
子父：自定义事件
万能：vuex、$bus、pubsub

经典面试题:数组去重[1,2,2,3,4,2];


平台属性携带参数格式:
props	 Array	 N	  商品属性的数组: ["属性ID:属性值:属性名"]   示例: ["2:6.0～6.24英寸:屏幕尺寸"]

props:['属性的ID:属性值:属性名']