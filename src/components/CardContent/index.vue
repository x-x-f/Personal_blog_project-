<template>
    <div class="cardContent">
        <el-skeleton style="width:100%;height: 100%;" :loading="loading" animated :count="3">
            <template>
                <el-card shadow="hover">
                    <span class="greet">{{hello}}</span>
                    <img style="width:100%;"
                        v-lazy="'http://101.34.40.159:5005/public/upload_image/article/10_8/0cfbbcd9b3ab9abd3b5dc65b24_2022_10_8_13_0_40.jpg'"
                        alt="图片暂时无法显示">
                    <div class="article_content">
                        <div class="article_list">
                            <span class="list_span">总文章</span><br>
                            <span>
                                <animate-number from="0" :to="ArticleNumber" duration="2500">
                                </animate-number>
                            </span>
                        </div>
                        <div class="article_list">
                            <span class="list_span">我发布</span><br>
                            <span>---</span>
                        </div>
                        <div class="article_list">
                            <span class="list_span">总浏览</span><br>
                            <span>---</span>
                        </div>
                    </div>
                </el-card>
            </template>
        </el-skeleton>
    </div>
</template>
<script>
export default {
    name: 'CardContent',
    data() {
        return {
            hello: '',
            loading: '',
            ArticleNumber: 1,//总文章数
        }
    },
    beforeMount() {
        this.$bus.$on('ArticleLength', (data) => {
            //函数体
            this.ArticleNumber = data;
        })
    },
    mounted() {

        this.loading = true
        setTimeout(() => (this.loading = false), 100)
        const date = new Date()
        const hour = date.getHours()
        if (6 <= hour && hour <= 8) {
            this.hello = '早上好!'
        } else if (9 <= hour && hour <= 11) {
            this.hello = '上午好！'
        } else if (11 < hour && hour <= 13) {
            this.hello = '中午好！'
        } else if (13 < hour && hour <= 18) {
            this.hello = '下午好！'
        } else if (18 < hour && hour <= 22) {
            this.hello = '晚上好！'
        } else {
            this.hello = '深夜，该休息了！'
        }
    },
}
</script>
<style scoped>
.cardContent {
    box-sizing: border-box;
    width: 78%;
    margin-top: 20%;
    margin-left: 20%;
    border: 1px solid #EBEEF5;
}

.el-card:hover {
    box-shadow: 1px 2px 4px rgb(194, 193, 193);
    cursor: pointer;
    transform: translateY(-5px);
}

.greet {
    position: relative;
    font-size: 18px;
}

.article_content {
    font-size: 16px;
    display: flex;
    text-align: center;
    justify-content: space-around;
}

.article_content .article_list {
    padding: 5px 0px;
    /* background-color: skyblue; */
}

.article_content .article_list:hover {
    box-shadow: 1px 2px 4px rgb(222, 220, 220);
}

.article_content .article_list .list_span {
    color: #91dafa;
    font-weight: 700;
    padding: 5px 10px;
    margin: 30px 0px;
}
</style>