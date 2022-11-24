<template>
    <div>
        <div class="head-imgbox">
            <img class="imgavater" style="width:100%" v-lazy=urlPage alt="" />
        </div>
        <div class="headers">
            <div class="header_word">
                <span @click="changeImage">hi{{ name === '0000' ? '' : ',' + name }}</span>
            </div>
            <div class="header_information">
                <!-- <div class="avtar"></div> -->
                <el-avatar :size="size" :src=circleUrl class="avtar"></el-avatar>
                <Search v-show="nacshow"></Search>
            </div>
            <span id="moreMerchant"></span>
        </div>
        <div :class="nacshow ? 'content_flex_on' : 'content_flex_off'">
            <div class="content_right" v-show="nacshow">
                <CardContent></CardContent>
                <CardHot></CardHot>
                <CardList></CardList>
            </div>
            <div :class="nacshow ? 'content_left' : 'content_left_off'" id="position">
                <div class="sort_content">
                    排序方式：
                    <span class="span1" style="color:#409EFF" @click="span_defau" id="position">默认</span>|
                    <span class="span3" @click="span_hot">最热</span>|
                    <span class="span2" @click="span_new">最新</span>
                </div>
                <ul>
                    <li v-for="(item, index) in articles" :key="index">
                        <card-page :article=item :nacshow=nacshow>
                        </card-page>
                    </li>
                </ul>
                <el-button class="getmore" @click="updateDate">{{ tips }}</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import CardContent from '@/components/CardContent/index.vue';
import CardPage from '@/components/CardPage/index.vue';
import CardList from '@/components/CardList/index.vue';
import Search from '@/components/Search/index.vue'
import { reqgetArticleListApi } from '../../api/index'
import { getToken } from '../../utils/storage'
import CardHot from '@/components/CardHot/index.vue';
import { mapState } from 'vuex';
export default {
    name: "HomePage",
    components: { CardContent, CardPage, CardList, CardHot, Search },
    data() {
        return {
            //主页背景图片
            urlPage: "http://101.34.40.159:5005/public/upload_image/article/10_8/f809be5eb856d61fb83fde625d_2022_10_8_10_47_57.jpg",
            articles: [],
            loading: false,
            isUpdate: true, // 是否到底-最后一页
            // count: 3, // 页大小
            page: 1, // 当前页
            sumpage: '', //总共多少页
            tips: '加载更多',
            nacshow: true,  //组件是否显示
            main: '',
            srcs: 0,
            name: '0000',//未登录时默认的名
            size: "medium",
            //无登录状态的留存的url
            Url: "http://101.34.40.159:5005/public/upload_image/avatar/10_9/4ea4fd9890557252_2022_10_9_20_42_7.png",
            //随时替换头像的url
            circleUrl: "http://101.34.40.159:5005/public/upload_image/avatar/10_9/4ea4fd9890557252_2022_10_9_20_42_7.png",
        }
    },
    computed: {
        ...mapState({ errors: (state) => state.Login.errors }),
    },
    watch: {
        errors() {
            // console.log(this.errors)
            this.$message.error(this.errors[this.errors.length - 1])
        },
    },
    mounted() {
        if (localStorage.getItem('userMsg')) {
            const userMsg = JSON.parse(localStorage.getItem('userMsg'))
            if (userMsg.user_pic) {
                this.circleUrl = userMsg.user_pic
            }
            if (userMsg.nickname) {
                this.name = userMsg.nickname
            } else {
                this.name = userMsg.username
            }
        } else {
            this.circleUrl = this.Url
        }
        //判断token是否还有效
        if (getToken()) {
            // if (!this.userMsg.username) {
            this.$store.dispatch('reqGetLoginInfo')
            // }
        }
        this.loading = true
        setTimeout(() => (this.loading = false), 300)
        //判断宽距是否大于900
        if (document.body.clientWidth <= 900) {
            this.nacshow = false;
        }
        this.$bus.$on('nacshow', (data) => {
            //函数体
            this.nacshow = data;
        })
        this.span_defau();
        // setTimeout(() => {
        //函数体
        this.movePosition();
        // }, 0)

    },
    methods: {
        //scrollIntoView()方法将调用它的元素滚动到浏览器窗口的可见区域。
        movePosition() {
            var potision = document.querySelector('#position')
            potision.scrollIntoView();
        },
        changeImage() {
            var imgavater = document.querySelector('.imgavater');
            if (this.srcs === 0) {
                imgavater.src = 'http://101.34.40.159:5005/public/upload_image/article/10_9/1aa03ca80f74dfc55e1386ff0f_2022_10_9_21_33_35.jpg'
            } else if (this.srcs === 1) {
                imgavater.src = 'http://101.34.40.159:5005/public/upload_image/article/10_8/f809be5eb856d61fb83fde625d_2022_10_8_10_47_57.jpg'
            } else if (this.srcs === 2) {
                imgavater.src = 'http://101.34.40.159:5005/public/upload_image/article/10_9/1aa03ca80f74dfc55e1386ff0f_2022_10_9_21_33_35.jpg'
            } else {
                imgavater.src = 'http://101.34.40.159:5005/public/upload_image/article/10_8/f809be5eb856d61fb83fde625d_2022_10_8_10_47_57.jpg'
            }
            this.srcs++;
            if (this.srcs === 4) {
                this.srcs = 0;
            }
        },
        span_defau() {
            // console.log('默认')
            var span = document.querySelector('.span2')
            span.style.color = ''
            var span = document.querySelector('.span3')
            span.style.color = ''
            var span = document.querySelector('.span1')
            span.style.color = '#409EFF'
            console.log('执行了')
            this.page = 1;
            this.isUpdate = true
            this.tips = '加载更多'
            var querys = 'page=' + this.page + '&main=' + 0
            this.main = 0;
            this.articles = [];
            this.loadData(querys)
        },
        span_new() {
            // console.log('最新')
            var span = document.querySelector('.span2')
            span.style.color = '#409EFF'
            var span = document.querySelector('.span1')
            span.style.color = ''
            var span = document.querySelector('.span3')
            span.style.color = ''
            this.page = 1;
            this.isUpdate = true
            this.tips = '加载更多'
            var querys = 'page=' + this.page + '&main=' + 1;
            this.main = 1;
            this.articles = [];
            this.loadData(querys)
        },
        span_hot() {
            // console.log('热门')
            var span = document.querySelector('.span3')
            span.style.color = '#409EFF'
            var span = document.querySelector('.span1')
            span.style.color = ''
            var span = document.querySelector('.span2')
            span.style.color = ''
            this.page = 1;
            this.isUpdate = true
            this.tips = '加载更多'
            var querys = 'page=' + this.page + '&main=' + 2;
            this.main = 2;
            this.articles = [];
            this.loadData(querys)
        },
        //首次加载
        async loadData(data) {
            const result = await reqgetArticleListApi(data)
            if (result.status) {
                this.$message.error(result.message)
            }
            console.log(result)
            this.articles = result.data;
            this.sumpage = result.sumpage
        },
        async updateDate() {
            //判断是否已经到底了
            if (this.sumpage === this.page) {
                this.isUpdate = false;
                this.$message.warning('没有更多了')
                this.tips = '暂时没有更多数据了';
            }
            if (this.isUpdate) {
                this.page += 1;
                var querys = 'page=' + this.page + '&main=' + this.main
                const result = await reqgetArticleListApi(querys)
                if (result.status) {
                    this.$message.error(result.message)
                }
                // console.log(result)
                var myList = this.articles;
                result.data.forEach(function (item) {
                    myList.push(item);
                })
                this.articles = myList;
                if (this.sumpage === this.page) {
                    this.tips = '暂时没有更多数据了'
                }
                // console.log(this.articles)
            }

        },

    }
}
</script>
<style scoped lang="less">
.clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.head-imgbox {
    /* position: relative; */
    height: 38vw;
    z-index: -1000;
    /* opacity: 0.5; */
}


.imgavater {
    position: fixed;
    z-index: -100;
}

.headers {
    z-index: 1000;
}

.avtar {
    width: 8vw;
    height: 8vw;
    /* background: white; */
    border-radius: 100%;
    transition: all 0.5s ease-out;
}

.avtar:hover {
    transform: rotate(360deg);

}

.header_word {
    position: absolute;
    top: 19vw;
    width: 100%;
    font-family: inherit;
    font-size: 40px;
    color: #fff;
    /* font: inherit; */

}

.header_word span {
    /* flex: right; */
    display: flex;
    justify-content: center;
}

.header_information {
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 30vw;
    left: 17.5vw;
    width: 65vw;
    height: 14vw;
    background: rgba(215, 240, 244, 0.5);
}

ul li {
    margin-bottom: 20px;
}


.content_flex_on {
    margin-top: 1vw;
    min-height: 20vw;
    display: flex;
    padding-right: 8vw;
    justify-content: space-around;
    z-index: 1000;
    background-color: rgba(248, 246, 246, 0.95);
}

.content_flex_off {
    margin-top: 1vw;
    min-height: 20vw;
    display: flex;
    justify-content: space-around;
    z-index: 1000;
    background-color: #f8f6f6;
}

.content_right {
    margin-top: 3vw;
    width: 30%;
    /* margin-top: 1vw; */
}

.content_left {
    width: 65%;
    /* margin-right: 8vw; */
    margin-top: 7.5vw;
    transition: all .5s ease;
}

.content_left_off {
    width: 90%;
    /* margin-right: 8vw; */
    margin-top: 7.5vw;
    transition: all .5s ease;
}

.sort_content {
    margin: 10px 0 10px 0;
    padding: 10px 0 0 0;

    span {
        margin: 0px 5px;
        padding: 5px 5px;
        // color: #409EFF;
        cursor: pointer;
    }
}

.getmore {
    margin: 1vw 0 2vw 0;
    width: 100%;
    color: #409EFF;
}
</style>