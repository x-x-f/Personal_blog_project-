<!-- 头部导航栏 -->
<template>
    <div class="nav">
        <div class="sign" v-show="nacshow">
            <span class="sign-span"></span><br>
        </div>
        <div class="nav-left">
            <ul>
                <router-link to="/homepage">
                    <li>
                        首页
                    </li>
                </router-link>
                <a href="http://game.xxfcloud.top" target="_blank">
                    <li>
                        小游戏
                    </li>
                </a>
                <li v-show="nacshow" @click="fenleiclass()">
                    分类
                </li>
                <router-link to="/about">
                    <li v-show="nacshow">
                        友链
                    </li>
                </router-link>
            </ul>
        </div>
        <div class="nav-right">
            <ul>
                <li v-show="userInfo ? true : false">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-avatar :size="size" :src=userInfo.user_pic>
                            </el-avatar>
                            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <router-link class="item" to="/home/editor">
                                <el-dropdown-item>
                                    我的空间
                                </el-dropdown-item>
                            </router-link>
                            <router-link class="item" to="/user">
                                <el-dropdown-item>
                                    <span>个人中心</span>
                                </el-dropdown-item>
                            </router-link>
                            <el-dropdown-item><span @click="isLogined">退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    {{ userInfo.username }}
                </li>
                <li v-show="!userInfo ? true : false" class="li">
                    <span>
                        <router-link to="/about">关于本站</router-link>
                    </span>
                </li>
                <li v-show="!userInfo ? true : false" class="li">
                    <span>
                        <router-link to="/register">注册</router-link>
                    </span>
                </li>
                <li v-show="!userInfo ? true : false" class="li">
                    <router-link to="/login">登陆</router-link>
                </li>
            </ul>

        </div>
    </div>
</template>
<script>
import { delToken } from '../../utils/storage'
// import { mapState } from 'vuex'
export default {
    name: 'Header',
    // computed: {
    //     ...mapState({ word: (state) => state.Header.word }),
    // },
    data() {
        return {
            nacshow: true,  //组件是否显示
            size: "small",
            userInfo: '',
            //无登录状态的留存的url
            Url: "http://localhost:5005/public/upload_image/avatar/10_8/err_2022_10_8_13_19_30.png",
        }
    },
    mounted() {
        //判断宽距是否大于900
        if (document.body.clientWidth <= 900) {
            this.nacshow = false;
        }
        this.$bus.$on('nacshow', (data) => {
            //函数体
            this.nacshow = data;
        })
        if (localStorage.getItem('userMsg')) {
            this.userInfo = JSON.parse(localStorage.getItem('userMsg'))
            if (!this.userInfo.user_pic) {
                this.userInfo.user_pic = this.Url
            }
        }
        this.$bus.$on('userInfo', (data) => {
            //函数体
            if (data) {
                this.userInfo = data;
            }
        })
    },
    methods: {
        isLogined() {
            delToken()
            this.$store.dispatch('isLogined')
            this.$router.replace('/homepage')
            this.userInfo = ''
            this.$message({
                message: '账号已退出！',
                type: 'success'
            });
        },
        fenleiclass() {
            this.$message.warning('该功能尚未完成！')
        }
    },
    beforeDestroy() {

    }
}
</script>
<style scoped lang="less">
a:visited {
    color: black;
}

.nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 45px;
    // opacity: 0.8;
    color: black;
    /* background: linear-gradient(to right, #B6A4BF, #FADD90); */
    // background: rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 1);

    box-sizing: border-box;
}

.sign {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    width: 35%;
    text-align: center;
}

.el-dropdown-link {
    color: #000;
    /* 图片和文字水平垂直居中 */
    vertical-align: middle;
}

.nav-left {
    height: 50%;
    width: 40%;
    float: left;
    top: 0px;
    margin-left: 8vw;
}

.nav-left ul li {
    float: left;
    box-sizing: border-box;
    height: 45px;
    left: 0px;
    padding: 12px 15px;
    font-size: 14px;
    cursor: pointer;
}

.nav-left ul li:hover {
    background: skyblue;
}

.nav-right {
    position: absolute;
    right: 0;
    height: 50%;
    width: 60%;
    color: black;
    margin-right: 8vw;
}

.nav-right ul li {
    float: right;
    right: 0;
    box-sizing: border-box;
    height: 45px;
    padding: 12px 15px;
    font-size: 14px;
    cursor: pointer;
}

.nav-right ul .li:hover {
    background: skyblue;
}
</style>