<template>
    <div class="cardContent">
        <el-skeleton style="width:100%;height: 100%;" :loading="loading" animated :count="2">
            <template>
                <el-card shadow="hover">
                    <div class="title">按分类</div>
                    <ul>
                        <li v-for="(cate) in catesList" :key="cate.Id">
                            {{cate.name}}（{{cate.alias}}）
                        </li>
                    </ul>
                </el-card>
            </template>
        </el-skeleton>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'CardList',
    data() {
        return {
            loading: ''
        }
    },
    mounted() {
        this.loading = true
        setTimeout(() => (this.loading = false), 0)
    },
    computed: {
        // ...mapState({cateList: (state) => state.Card.cateList })
        ...mapState({ catesList: (state) => state.Card.catesList })
    }
}
</script>

<style scoped>
.title {
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
    border: 1px solid #EBEEF5;
}

ul li {
    padding: 10px 5px;
    /* 文字不换行 */
    white-space: nowrap;
    margin: 5px;
}

.el-card:hover {
    box-shadow: 3px 3px 10px #999;
    cursor: pointer;
    transform: translateY(-5px);
}
</style>