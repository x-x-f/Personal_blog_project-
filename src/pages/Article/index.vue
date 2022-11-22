<template>
    <div>
        <div class="head-imgbox">
            <img class="imgavater" style="width: 100%;height: 100%;" v-lazy=urlPage alt="" />
        </div>
        <el-container>
            <template slot="template">
                <el-skeleton-item variant="image" style="width: 100%; height: 580px;" />
                <div style="padding: 14px;">
                    <el-skeleton-item variant="h3" style="width: 50%;" />
                    <div
                        style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;">
                        <el-skeleton-item variant="text" style="margin-right: 16px;" />
                        <el-skeleton-item variant="text" style="width: 30%;" />
                    </div>
                </div>
            </template>
            <el-aside width="25%" v-show="nacshow" style="padding-top: 5vw;margin-left: -10px;">
                <CardHot></CardHot>
                <CardList></CardList>
            </el-aside>
            <!-- background-color:#f8f6f6; -->
            <el-container style="padding-top: 6vw;" :class="nacshow ? 'content_flex_on' : 'content_flex_off'">
                <el-skeleton style="width:100%;" :loading="loading" animated :count="12">
                    <template slot="template">
                        <div style="padding: 14px;">
                            <el-skeleton-item variant="h3" style="width: 100%;" />
                            <div
                                style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;">
                                <el-skeleton-item variant="text" style="margin-right: 16px;" />
                                <el-skeleton-item variant="text" style="width: 30%;" />
                            </div>
                        </div>
                    </template>
                    <template>
                        <el-card shadow="never" style="margin-bottom: 2vw;">
                            <ArticleContent :author="this.$route.query.author" :article_id="this.$route.params.id">
                            </ArticleContent>
                        </el-card>
                    </template>
                </el-skeleton>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import ArticleContent from './ArticleContent/index.vue';

export default {
    name: "Article",
    data() {
        return {
            urlPage: "http://101.34.40.159:5005/public/upload_image/article/10_12/fe95275118ff0dd19da8945357_2022_10_12_14_28_8.jpg",
            loading: "",
            nacshow: true, //组件是否显示
        };
    },
    mounted() {
        this.loading = true;
        setTimeout(() => (this.loading = false), 300);
        //判断宽距是否大于900
        if (document.body.clientWidth <= 900) {
            this.nacshow = false;
        }
        this.$bus.$on("nacshow", (data) => {
            //函数体
            this.nacshow = data;
        });
    },
    methods: {
    },
    components: { ArticleContent }
}
</script>
<style scoped>
.head-imgbox {
    /* position: relative; */
    /* height: 38vw; */
    z-index: -1000;
    /* opacity: 0.5; */
}


.imgavater {
    position: fixed;
    z-index: -100;
}

.content_flex_on {
    min-height: 20vw;
    display: flex;
    padding-right: 8vw;
    justify-content: space-around;
    background-color: rgba(248, 246, 246, 1);
    transition: all .5s ease;
}

.content_flex_off {
    min-height: 20vw;
    display: flex;
    justify-content: space-around;
    background-color: rgba(248, 246, 246, 1);
    transition: all .5s ease;
}

.el-card {
    margin-right: 3%;
    margin-left: 1%;
    min-height: 800px;
}
</style>