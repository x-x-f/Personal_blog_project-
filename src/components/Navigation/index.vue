<!-- 侧边栏模块 -->
<template>
    <div class="menu-box">
        <div class="emotion-box">
            <i id="emotion1" class="iconfont icon-faxian"></i>
            <i id="emotion2" class="iconfont icon-shuru"></i>
        </div>
        <ul>
            <li>
                <router-link to="/homepage">
                    <i class="iconfont icon-shouye"></i>
                    <p class="content">首页</p>
                </router-link>
            </li>
            <li @click="fenleiclass">
                <a href="javascript:;">
                    <i class="iconfont icon-fenlei"></i>
                    <p class="content">分类</p>
                </a>
            </li>
            <li @click="isFullScreen">
                <a>
                    <i class="iconfont">&#xeb11;</i>
                    <p class="content">全屏</p>
                </a>
            </li>
            <li>
                <router-link to="/home/editor">
                    <i class="iconfont icon-wode"></i>
                    <p class="content">我的</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Navigation',
    props: ['isFullScreen'],
    methods: {
        fenleiclass() {
            this.$message.warning('该功能尚未完成！')
        }
    }
}
</script>
<style scoped>
@font-face {
    font-family: "iconfont";
    /* Project id 3653377 */
    src: url('../../assets/icon/iconfont.woff2?t=1664443472134') format('woff2'),
        url('../../assets/icon/iconfont.woff?t=1664443472134') format('woff'),
        url('../../assets/icon/iconfont.ttf?t=1664443472134') format('truetype');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-quanping:before {
    content: "\e626";
}

.icon-faxian:before {
    content: "\e80f";
}

.icon-jilu:before {
    content: "\e810";
}

.icon-fenlei:before {
    content: "\e811";
}

.icon-zhishi:before {
    content: "\e813";
}

.icon-shuru:before {
    content: "\e816";
}

.icon-shezhi:before {
    content: "\e817";
}

.icon-xiaoxi:before {
    content: "\e818";
}

.icon-shouye:before {
    content: "\e819";
}

.icon-wode:before {
    content: "\e81a";
}

.iconfont {
    font-size: 26px !important;
    color: #797a7b;
    line-height: 45px;
    text-align: center;
}

.menu-box {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 50px;
    height: 250px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, .2);
    /* 添加过度 */
    transition: all 0.8s ease-out;
    overflow: hidden;
}

.menu-box:hover {
    width: 80px;
    border-radius: 60px;
}

/* hover 让文字出现 */
.menu-box:hover>ul>li p {
    display: block;
}

/* 表情盒子 */
.emotion-box {
    width: 100%;
    text-align: center;
    margin: 10px auto;
}

#emotion1,
#emotion2 {
    color: pink;
    font-size: 32px !important;
    animation: jitter 0.3s linear forwards;
}

#emotion2 {
    display: none;
}

.menu-box:hover #emotion1 {
    display: none;
}

.menu-box:hover #emotion2 {
    display: block;
}

ul {
    width: 100%;
    height: 75%;
}

li {
    list-style: none;
}

li>a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    text-decoration: none;
    /* 禁止用户选中 */
    user-select: none;
}

li:hover {
    background-color: rgba(252, 213, 206, 0.3);
    cursor: pointer;
}

li:hover .content,
li:hover i {
    color: pink;
}

li:hover {
    animation: jitter 0.2s linear forwards;
}

.content {
    display: none;
    padding-left: 5px;
    color: #797a7b;
    /* 设置文字不换行 */
    white-space: nowrap;
    transition: all 0.2s case-out;
}

@keyframes jitter {
    0% {
        transform: scale(1.2) rotate(10deg);
    }

    100% {
        transform: scale(0.8) rotate(-10deg);
    }

    0% {
        transform: scale(1.2) rotate(0deg);
    }
}
</style>