<template>
    <div>
        <header class="header">
            <h2>
                {{article.title}}
            </h2>
            <div class="pub_date">{{author}} • 发表于<span>{{article.pub_date}}</span></div>
        </header>
        <article v-html="article.htmlText" class="markdown-body"></article>
    </div>
</template>
<script>
import { reqgetArticleApi } from '@/api/index'
import { mapState } from 'vuex';
import "/node_modules/github-markdown-css/github-markdown.css"
import showdown from 'showdown';
let converter = new showdown.Converter();
// 显示表格
converter.setOption("tables", true);
export default {
    name: 'ArticleContent',
    props: ['author', 'article_id'],
    watch: {
        article_id() {
            // console.log('发生了改变')
            this.$store.dispatch('getArticle', this.$route.params.id)
        },
    },
    computed: {
        ...mapState({ article: (state) => state.Homepage.article }),
    },
    mounted() {
        this.getArticle(this.$route.params.id)
    },
    methods: {
        async getArticle(id) {
            const result = await reqgetArticleApi(id)
            if (result.status) {
                this.$message.error('信息获取失败')
            }
            if (this.article.title === '') {
                this.article.htmlText = converter.makeHtml(result.data[0].content);
                this.article.title = result.data[0].title;
                this.article.pub_date = result.data[0].pub_date;
            }

        },
    },
    beforeDestroy() {
        this.article.title = ''
    }
}
</script>
<style scoped>

h2 {
    margin: 10px 0px;
    text-align: center;
    font-size: 20px;
}

.pub_date {
    margin: 10px 0px;
    font-size: 14px;
    text-align: center;
}
</style>