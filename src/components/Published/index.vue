<!-- 已发布文章模块 -->
<template>
    <div class="backgrounds">
        <div v-show="show">
            <span>当前并没有数据哦！
                <router-link to="/home/editor">
                    <span style="color:#409EFF">尽情去创作哦！</span>
                </router-link>
            </span>
        </div>
        <div class="list">
            <el-card shadow="never" class="elCard" v-for="(article,index) in ArticleData" :key="index">
                <header class="header">
                    <h2>{{article.title}}</h2>
                    <div class="pub_date">编辑于{{article.pub_date}}</div>
                </header>
                <div style="height:160px;overflow: hidden;margin-bottom: 5px;">
                    <img v-lazy=article.cover_img alt="" style="width:100%" />
                </div>
                <div class="edit">
                    <el-button icon="el-icon-edit" circle @click="changeArticle"></el-button>
                    <div style="text-align:center">
                        <span>状态</span><br>
                        <span>{{Number(article.state) ? '已发布':'审核中'}}</span>
                    </div>
                    <el-button icon="el-icon-delete" @click="deleteArticle(article)" circle>
                    </el-button>
                </div>
            </el-card>
        </div>

    </div>
</template>
<script>
// import { mapState } from 'vuex'
import { reqgetUserArticleApi, reqdeleteUserArticleApi } from '@/api/index'
export default {
    name: 'Published',
    data() {
        return {
            ArticleData: [],
            show: true,
        }
    },
    mounted() {
        this.getUserArticle()
    },
    methods: {
        changeArticle() {
            this.$message.warning('目前暂时只支持删除，不支持重新编辑！')
        },
        async getUserArticle() {
            const result = await reqgetUserArticleApi()
            if (result.status) return console.log('服务器访问出错！')
            // console.log('111', result.data)
            this.ArticleData = result.data.slice(0, 6);
            // this.ArticleData = [];
            if (this.ArticleData.length) {
                this.show = false;
            } else {
                this.show = true;
            }
        },
        async delete(article) {
            // console.log(article)
            const result = await reqdeleteUserArticleApi(article.Id);
            // console.log(result);
            if (result.status) return this.$message.error(result.message);
            this.$message.success(result.message);
            for (var i = 0; i < this.ArticleData.length; i++) {
                if (this.ArticleData[i].Id === article.Id) {
                    this.ArticleData.splice(i, 1);
                    break;
                }
            }
            if (this.ArticleData.length === 0) {
                this.show = true;
            }
        },
        deleteArticle(article) {
            this.$confirm('此操作将删除该文章, 是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.delete(article);
            }).catch(() => {
                this.$message({
                    // type: 'info',
                    type: 'success',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>
<style scoped>
.backgrounds {
    background-color: #f8f6f6;
    min-height: 800px;
    padding: 0 0 10px 5px;
}

.list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
}

.elCard {
    /* display: inline-block; */
    margin-top: 25px;
    width: 370px;
    height: 285px;
}

h2 {
    text-align: center;
    font-size: 16px;
}

.pub_date {
    margin: 10px 0px;
    font-size: 14px;
    text-align: center;
}

.edit {
    display: flex;
    justify-content: space-between;
}
</style>