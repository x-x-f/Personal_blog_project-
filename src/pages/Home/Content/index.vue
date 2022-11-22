<template>
    <div>
        <el-tabs>
            <el-tab-pane label="已发布内容">
                <Published></Published>
                <!-- <el-empty :image-size="200"></el-empty> -->
            </el-tab-pane>
            <el-tab-pane label="草稿箱">
                <Draft></Draft>
            </el-tab-pane>
            <el-tab-pane label="回收站">
                <el-empty :image-size="200"></el-empty>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Draft from '@/components/Draft'
import Published from '@/components/Published'
export default {
    name: "Content",
    components: { Draft, Published },
    mounted() {
        this.$bus.$emit('navShows', false)
    }
}
</script>
<style scoped>

</style>