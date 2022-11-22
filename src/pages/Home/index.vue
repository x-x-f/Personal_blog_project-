<template>
    <div>
        <el-container>
            <el-aside width="10vw" style="margin-top:10px;min-height: 900px;">
                <h2>我的</h2>
                <ul>
                    <li @click="contentarea" :class="!navShows ? 'navlion':'navlioff'">
                        内容区
                    </li>
                    <li @click="editarea" :class="navShows ? 'navlion':'navlioff'">
                        写博客
                    </li>
                </ul>
            </el-aside>
            <el-main style="height:100%;">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: "Home",
    computed: {
        ...mapState({ userMsg: (state) => state.Login.userMsg })
    },
    data() {
        return {
            navShows: ''
        }
    },
    mounted() {
        // this.editarea()
        this.navShows = true;
        // console.log(this.$route)
        if (this.$route.name == 'content') {
            this.navShows = false;
        }
        this.$bus.$on('navShows', (data) => {
            //函数体
            this.navShows = data;
        })
        if (this.userMsg.username === 0) {
            this.$store.dispatch('reqGetLoginInfo')
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        editarea() {
            // this.navShows = true;
            this.$router.replace({ name: 'editer' })
        },
        contentarea() {
            // this.navShows = false;
            this.$router.replace({ name: 'content' })
        }
    },

}        
</script>
<style scoped>
h2 {
    margin-bottom: 20px;
}

ul li {
    font-size: 16px;
    cursor: pointer;
    /* margin: 10px 0px; */
    padding: 10px 10px;
    /* border-bottom: 1px solid black; */
}

.navlion {
    background: #fff;
}

.navlioff {
    background: #e9eef3;
}

.el-header,
.el-footer {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
}

.el-aside {
    padding-top: 50px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 400px; */
}

.el-main {
    margin: 0;
    padding: 0;
    padding-top: 42px;
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    height: 800px;
    /* line-height: 800px; */
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>