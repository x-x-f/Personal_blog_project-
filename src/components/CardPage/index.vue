<template>
    <el-skeleton style="width:80% margin-left:10%" :loading="loading" animated :count="1">
        <template slot="template">
            <el-skeleton-item variant="h3" style="margin:15px 30%;width: 30%;" />
            <el-skeleton-item variant="image" style="width: 870px; height: 267px;" />
            <div style="padding: 14px;">
                <div
                    style="display: flex; align-items: center; justify-items: space-between; margin-top: 10px; height: 16px;">
                    <el-skeleton-item variant="text" style="margin:0px 30%;width: 30%;margin-bottom: 20px;" />
                </div>
            </div>
        </template>
        <template>
            <el-card shadow="never">
                <span class="round_date" v-show="nacshow">
                    <span class="month">{{ month }}</span><br>
                    <span class="day">{{ day }}</span>
                </span>
                <el-tooltip class="item" effect="light" :content="'文章分类' + cate_name" placement="bottom-end">
                    <span class="tabs" v-show="nacshow">
                        {{ cate_name }}
                    </span>
                </el-tooltip>
                <header class="header">
                    <h2>
                        <a @click="goArticle">
                            {{ article.title }}
                        </a>
                    </h2>
                    <div class="pub_date">{{ author }} • 发表于<span>{{ year }}年{{ month }}{{ day }}日 •
                            {{ article.visit_number }}浏览 • </span></div>
                </header>
                <div
                    style="width:80%; margin-left:10%; height:25vw; max-height:300px;overflow: hidden; text-align: center;">
                    <!-- <img :src=article.cover_img alt="" style="width:100%" /> -->
                    <img class="pic_img" v-lazy=img_cover alt="" style="height: 100%;" />
                </div>
                <div style="text-align:center" class="read_div"><span class="read" @click="goArticle">阅读全文>></span>
                </div>
            </el-card>
        </template>
    </el-skeleton>

</template>
<script>
import "/node_modules/github-markdown-css/github-markdown.css"
import showdown from 'showdown';
let converter = new showdown.Converter();
converter.setOption("tables", true);
import { reqgetAuthorApi, reqgetCateApi } from '../../api/index'
export default {
    name: 'CardPage',
    data() {
        return {
            loading: '',
            htmlTitle: '',
            author: '',
            id: '',
            year: '',
            month: '9月',
            day: '28',
            cate_name: '',
            img_cover: this.article.cover_img
        }
    },
    props: ['article', 'nacshow'],
    mounted() {
        this.loading = true
        setTimeout(() => (this.loading = false), 500)
        //获取作者信息
        this.getAuthor()
        //获取文章分类信息
        this.getCate()
        //调用转换时间
        this.becomedate()
    },
    methods: {
        //获取作者信息
        async getAuthor() {
            let results = await reqgetAuthorApi(this.article.author_id)
            // console.log(results.data)
            if (results.status) return this.$message.error('获取失败！')
            this.author = results.data[0].nickname
        },
        //获取文章分类信息
        async getCate() {
            let result = await reqgetCateApi(this.article.cate_id);
            if (result.status) return this.$message.error(result.message);
            // console.log(result.data[0].name)
            this.cate_name = result.data[0].name;
        },
        //转换时间
        becomedate() {
            let date = new Date(this.article.pub_date)
            // console.log(this.article.pub_date);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate()
            this.year = year;
            this.month = month + '月';
            this.day = day;
        },
        goArticle() {
            this.$router.push({
                name: 'article',
                params: {
                    id: this.article.Id,
                },
                query: {
                    author: this.author
                }
            })
        }
    }
}
</script>
<style scoped>
h2 {
    /* margin: 10px 0px; */
    text-align: center;
    font-size: 20px;
}

.header {
    margin-top: 2vw;
}

.pub_date {
    margin: 10px 0px;
    font-size: 14px;
    text-align: center;
}

.pic_img {
    /* transform-origin: top left; */
    transition: all .4s ease;
}

.pic_img:hover {
    transform: scale(1.1);
}

.read_div {
    margin: 20px 0px 0px 0px;
}

.read {
    padding: 5px 5px;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    background-color: #97dffd;
}

.read:hover {
    background: rgb(131, 130, 130);
}

.el-card {
    position: relative;
    /* overflow: none; */
}

.round_date {
    /* float: left; */
    position: absolute;
    right: 15px;
    height: 45px;
    text-align: center;
    background: #97dffd;
    color: #fff;
    width: 60px;
    padding-top: 10px;
    padding-bottom: 5px;
    border-radius: 100px;
}

.month {
    font-size: 14px;
}

.day {
    font-size: 20px;
}

.tabs {
    position: absolute;
    /* right: 0px; */
    top: 2vw;
    height: 30px;
    text-align: center;
    background: #97dffd;
    color: #fff;
    width: 60px;
    border-radius: 5px;
    box-sizing: border-box;
    padding-top: 5px;
    cursor: pointer;
}
</style>