<template>
    <div>
        <header class="article-header">
            <h2 class="header">
                {{ article.title }}
            </h2>
            <div class="pub_date">{{ author }} • 发表于<span>{{ article.pub_date }}</span></div>
        </header>
        <article v-highlight v-html="article.htmlText" class="markdown-body"></article>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import "/node_modules/github-markdown-css/github-markdown.css"
import showdown from 'showdown';
let converter = new showdown.Converter();
// 显示表格
converter.setOption("tables", true);
//引入代码高亮的样式
import "highlight.js/styles/atelier-cave-light.css";
export default {
    name: 'ArticleContent',
    props: ['author', 'article_id'],
    watch: {
        article_id() {
            console.log('发生了改变')
            this.$store.dispatch('getArticle', this.$route.params.id)
        },
    },
    computed: {
        ...mapState({ article: (state) => state.Homepage.article }),
    },
    mounted() {
        this.$store.dispatch('getArticle', this.$route.params.id);
    },
    beforeDestroy() {
        this.article.title = ''
    }
}
</script>
<style lang="less">
.article-header {
    .header {
        margin: 10px 0px;
        text-align: center;
        font-size: 20px;
    }
    .pub_date {
        margin: 10px 0px;
        font-size: 14px;
        text-align: center;
    }
}

/* 对于markdown的修改 */
.markdown-body ol {
    margin: 0 0 0 35px;
    padding: 0;
    list-style-type: decimal;
}

.markdown-body ol li:last-child {
    display: none;
}

.markdown-body ol li {
    margin: 0;
    font-size: 14px;
    padding-left: 15px;
    white-space: pre;
    list-style-position: outside;
    border-left: 1px solid #c5c5c5;
}
</style>