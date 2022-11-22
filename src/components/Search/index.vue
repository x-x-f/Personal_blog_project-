<!-- 搜索模块 -->
<template>
    <div class="search">
        <el-autocomplete prefix-icon="el-icon-search" v-model="state" :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
    </div>
</template>
<script>
import { reqgetArticleSearchApi, reqgetAuthorApi } from '../../api/index'
export default {
    name: 'Search',
    data() {
        return {
            restaurants: [],
            state: '',
            timeout: null,
            searchlist: [],
            author: ''
        };
    },
    mounted() {
        this.restaurants = this.loadAll();
    },
    methods: {
        //获得服务器传回的数据
        async loadData() {
            var data = 'main=' + 3;
            const result = await reqgetArticleSearchApi(data)
            if (result.status) {
                this.$message.error(result.message)
            }
            const list = result.data;
            // console.log(list.length)
            //获得文章的数量，并将绑定为全局事件总线
            this.$bus.$emit('ArticleLength', list.length)
            for (var i = 0; i < list.length; i++) {
                // console.log(list[i])
                let res = JSON.parse(JSON.stringify(list[i]).replace(/title/g, 'value'))
                // console.log(res)
                this.searchlist.push(res)
            }
        }
        ,
        loadAll() {
            this.loadData()
            return this.searchlist
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 1000 * Math.random());
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //获取作者信息
        async getAuthor(item) {
            let results = await reqgetAuthorApi(item.author_id)
            if (results.status) return this.$message.error('获取失败！')
            this.author = results.data[0].nickname
        },
        //用户点击了那个跳转那个
        handleSelect(item) {
            this.getAuthor(item);
            //有异步，所以进行延时；
            setTimeout(() => {
                //函数体
                this.$router.push({
                    name: 'article',
                    params: {
                        id: item.Id,
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
.search {
    position: absolute;
    top: 10vw;
    left: 25vw;
}

/* >>>是vue的深度选择器 */
.search>>>.el-input__inner {
    height: 37px;
    width: 15vw;
    cursor: pointer;
    margin-right: 5px;
    padding: 2px 25px;
    border-radius: 10px;
    border: 2px solid #fff;
    outline: none;
    transition: all .4s ease-out;
}

.search>>>.el-input__inner:hover {
    width: 25vw;
    padding-left: 30px;
    border: 2px solid rgb(126, 209, 242);
}

.search>>>.el-input__inner:focus {
    width: 25vw;
    padding-left: 30px;
    border: 2px solid rgb(126, 209, 242);
}
</style>