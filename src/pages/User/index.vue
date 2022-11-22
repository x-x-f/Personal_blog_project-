<template>
    <div class="user-header">
        <UserMsg></UserMsg>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import UserMsg from "./UserMsg";
export default {
    computed: {
        ...mapState({ userMsg: (state) => state.Login.userMsg })
    },
    mounted() {
        if (this.userMsg.username === '') {
            this.$store.dispatch('reqGetLoginInfo')
        }
    },
    data() {
        return {
            tabPosition: 'left'
        }
    },

    methods: {
        goBack() {
            this.$router.push("/home/editor");
        }
    },
    components: { UserMsg }
}
</script>
<style scoped>
.user-header {
    padding-top: 70px;
    background: #B3C0D1;
    min-height: 800px;
}

.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 160px;
}

.el-header {
    padding-top: 18px;
    padding-left: 40px;
}

.el-aside {
    height: 650px;
    overflow-y: hidden;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /* width: 500px; */
    /* line-height: 400px; */
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