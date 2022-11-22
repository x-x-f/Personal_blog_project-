<!-- 草稿箱模块 -->
<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="草稿ID" width="180">
            <template slot-scope="scope">
                <p>{{ scope.row.Id }}</p>
            </template>
        </el-table-column>
        <el-table-column label="标题" width="180">
            <template slot-scope="scope">
                <!-- <el-popover trigger="hover" placement="top"> -->
                <p>{{ scope.row.title }}</p>
                <!-- <p>住址: {{ scope.row.address }}</p> -->
                <!-- <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div> -->
                <!-- </el-popover> -->
            </template>
        </el-table-column>
        <el-table-column label="内容">
            <template slot-scope="scope">
                <p style="width:250px;height:100px;overflow: hidden;">{{ scope.row.content }}</p>
            </template>
        </el-table-column>
        <el-table-column label="最后修改日期" width="200">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.change_date }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">前往编辑</el-button>
                <el-button slot="reference" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { mapState } from 'vuex'
import { reqgetArticleDraftApi,reqdeleteArticleDraftApi } from '@/api/index'
export default {
    name: 'Draft',
    computed: {
        ...mapState({ userMsg: (state) => state.Login.userMsg })
    },
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.getArticleDraft()
    },
    methods: {
        handleEdit(index, row) {
            localStorage.removeItem('context')
            this.$router.push({
                name: 'editer',
                params: {
                    row
                }
            })
            // console.log(index, row);
        },
        async handleDelete(index, row) {
            const result=await reqdeleteArticleDraftApi(row.Id)
            if(result.status) return this.$message.error('删除失败！服务器异常')
            this.$message.success(result.message)
            //重新调用
            this.getArticleDraft()
            // console.log(index, row);
        },
        async getArticleDraft() {
            const result = await reqgetArticleDraftApi(this.userMsg.id)
            // console.log(result)
            this.tableData = result.data;
        }
    }
}
</script>
<style scoped>

</style>