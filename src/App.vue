<template>
    <div class="box">
        <Header class="header" id="nav-bar" :class="navShow ? 'navOn' : 'navOff'"></Header>
        <nav>
            <!-- <el-button style="height:100px" @click="isFullScreen">全屏</el-button> -->
            <!-- 缓存多个路由组件 -->
            <!-- <keep-alive :include="['Register','Login','Home']"> -->
            <transition :name="transitionName">
                <router-view></router-view>
            </transition>
            <!-- </keep-alive> -->
            <Navigation :isFullScreen="isFullScreen" v-show="$route.meta.NavShow && nacshow" class="navigation" v-drag
                draggable="false"></Navigation>
        </nav>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from './components/Footer'
import screenfull from 'screenfull'
export default {
    name: "App",
    data() {
        return {
            top: '',
            navShow: true,
            transitionName: '',
            nacshow: true,
        }
    },
    components: { Footer },
    watch: {
        top(newValue, oldValue) {
            // 等新值大于100的时候再做变化（优化一下）自行设置
            if (80 < newValue < 200) {
                if (newValue > oldValue) {
                    this.navShow = false
                    // console.log('向下滚动')
                } else {
                    this.navShow = true
                    // console.log('向上滚动')
                }
            }
        },
    },
    mounted() {
        this.$store.dispatch('getCates');
        window.addEventListener('scroll', () => {
            this.top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
        })
        //监测浏览器宽距大小
        const that = this
        window.addEventListener('resize', function () {
            // console.log("onresize")
            that.ScreenWidthOnsize();
        })
        window.onresize = this.ScreenWidthOnsize();
    },
    //自定义事件，使鼠标可拖动导航栏移动
    directives: {
        drag(el) {
            let oDiv = el // 当前元素
            // let self = this // 上下文
            // 禁止选择网页上的文字
            // document.onselectstart = function () {
            //     return false
            // }
            oDiv.onmousedown = function (e) {
                // 鼠标按下，计算当前元素距离可视区的距离
                let disX = e.clientX - oDiv.offsetLeft
                let disY = e.clientY - oDiv.offsetTop
                document.onmousemove = function (e) {
                    // 通过事件委托，计算移动的距离
                    let l = e.clientX - disX
                    let t = e.clientY - disY
                    // 移动当前元素
                    oDiv.style.left = l + 'px'
                    oDiv.style.top = t + 'px'
                }
                document.onmouseup = function (e) {
                    document.onmousemove = null
                    document.onmouseup = null
                }
                // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
                return false
            }
        }
    },
    methods: {
        //是否全屏
        isFullScreen() {
            screenfull.toggle()
        },
        ScreenWidthOnsize() {
            // console.log(document.body.clientWidth)
            if (document.body.clientWidth <= 820) {
                this.nacshow = false;
                this.$bus.$emit('nacshow', this.nacshow)
                // this.nacshow = false;
            } else {
                this.nacshow = true;
                this.$bus.$emit('nacshow', this.nacshow)
                // this.nacshow = true;
            }
        },
    },
    beforeDestroy() {
        //解绑全局事件总线
        this.$bus.$off('nacshow')
    }
}
</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
}

.header {
    z-index: 1000;
}

.navigation {
    /* display: none; */
    position: fixed;
    top: 48%;
    left: 5px;
    z-index: 1000;
}
.navOn {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: all 0.2s ease-in-out 0.2s;
    transform: translateZ(0);
    z-index: 9;
}

.navOff {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: all 0.2s ease-in-out 0.2s;
    transform: translate3d(0, -100%, 0);
    z-index: 9;
}

.slide-left-enter {
    opacity: 0;
}

.slide-left-leave {
    opacity: 1;
}

.slide-left-enter-active {
    transition: opacity 2s;
}

.slide-left-leave-active {
    opacity: 0;
    transition: opacity .5s;
}

.slide-right-enter {
    opacity: 0;
}

.slide-right-leave {
    opacity: 1;
}

.slide-right-enter-active {
    transition: opacity 2s;
}

.slide-right-leave-active {
    opacity: 0;
    transition: opacity .5s;
}
</style>
