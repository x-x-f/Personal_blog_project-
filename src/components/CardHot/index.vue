<template>
    <div class="cardContent">
        <el-skeleton style="width:100%;height: 100%;" :loading="loading" animated :count="2">
            <template>
                <el-card shadow="hover">
                    <div class="tabs">热门文章</div>
                    <ul>
                        <li v-for="(article, index) in articleHotList " :key="index">
                            <span @click="goArticle(article)">{{ article.title }}</span>—{{ article.visit_number }}次围观
                        </li>
                    </ul>
                </el-card>
            </template>
        </el-skeleton>
    </div>
</template>
<script>
import { reqgetArticleHotListApi, reqgetAuthorApi } from '@/api/index'
export default {
    name: 'CardHot',
    data() {
        return {
            loading: '',
            articleHotList: '',
            author: '',
        }
    },

    mounted() {
        this.reArticleHotList();
        this.loading = true
        setTimeout(() => (this.loading = false), 0)
    },
    methods: {
        async reArticleHotList() {
            const result = await reqgetArticleHotListApi()
            if (result.status) return this.$message.error('请求出错！')
            // console.log(result.data)
            this.articleHotList = result.data;
        },
        //获取作者信息
        async getAuthor(article) {
            let results = await reqgetAuthorApi(article.author_id)
            if (results.status) return this.$message.error('获取失败！')
            this.author = results.data[0].nickname
        },
        goArticle(article) {
            // console.log(article)
            this.getAuthor(article);
            //有异步，所以进行延时；
            setTimeout(() => {
                //函数体
                this.$router.push({
                    name: 'article',
                    params: {
                        id: article.Id,
                    },
                    query: {
                        author: this.author,
                    }
                })
            }, 300)
        }
    }
}
</script>

<style scoped>
.tabs {
    /* position: absolute;*/
    /* right: 0px; */
    /* top: 2vw;
    height: 30px;  */
    padding: 5px 10px;
    margin: 0px auto 10px 0px;
    text-align: center;
    background: #97dffd;
    color: #fff;
    font-size: 18px;
    /* border-radius: 5px; */
    box-sizing: border-box;
    padding-top: 5px;
    cursor: pointer;
}

.cardContent {
    box-sizing: border-box;
    width: 78%;
    margin-top: 5%;
    margin-left: 20%;
    margin-bottom: 5%;
    font-size: 14px;
    border: 1px solid #EBEEF5;
}

ul li {
    padding: 10px 5px;
    /* 文字不换行 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 5px;
}

ul li span:hover {
    color: skyblue;
}

.el-card:hover {
    box-shadow: 3px 3px 10px #999;
    cursor: pointer;
    /* 向上移动5px */
    transform: translateY(-5px);
}
</style>