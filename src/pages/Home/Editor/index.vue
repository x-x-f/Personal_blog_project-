<!-- 编辑区 -->
<template>
        <div class="editor">
            <div class="headerControl">
                <el-button type="text" @click="dialogFormVisible = true">申请发布</el-button>
                <el-dialog title="发布文章" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="标题名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="选择文章分类" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option v-for="(card,index) in catesList" :key="index" :label="card.name"
                                    :value="card.Id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="封面图片链接" :label-width="formLabelWidth">
                            <el-input v-model="form.hrefdata" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="releaseArticle">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button @click="save_article_draft" style="margin-right:20px" type="warning">保存草稿到服务器
                </el-button>
            </div>
            <mavon-editor class="mavEdit" ref=md style="width: 100%; height: 100%;" aria-placeholder="开始编辑..."
                v-model="context" :toolbars="toolbars" @change="changeFn" @save="saveFn" @imgAdd="imgAddFn"
                @imgDel="imgDel" language="zh" navigation ishljs />
        </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { getToken } from '../../../utils/storage'
import { reqSendArticleDraftApi, reqReleaseArticleApi } from '@/api'

// import {mavonEditor} from 'mavon-editor'
export default {
    name: 'Editor',
    data() {
        return {
            context: '',//输入的数据
            html: '<h2>ihao</h2>',
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',//标题名
                region: '',//分类
                hrefdata: '',//封面图片链接
                // date1: '',
                // date2: '',
                // delivery: false,
                // type: [],
                // resource: '',
                // desc: ''
            },
            formLabelWidth: '120px'
        }
    },
    mounted() {
        this.$bus.$emit('navShows', true)
        if (localStorage.getItem('context')) {
            this.context = localStorage.getItem('context')
            this.$message.success('读取本地缓存成功！')
        }
        if (this.$route.params.row) {
            this.context = this.$route.params.row.content
            console.log('执行了')
        }
        // console.log(this.$route.params.row)
    },
    computed: {
        ...mapState({ catesList: (state) => state.Card.catesList }),
        ...mapState({ userMsg: (state) => state.Login.userMsg })
    },
    methods: {
        imgDel(pos) {
            console.log(pos)
        },
        // 编辑区域内容改变
        changeFn(value, render) {
            // console.log(value, render)
            this.html = render
        },
        // 保存的时候的事件
        saveFn(e) {
            console.log(e)
            console.log(this.context)
            console.log(this.html)

            localStorage.setItem('context', this.context)
            this.$message.success('保存本地缓存成功！')
            // console.log(html)
        },
        // 添加上传图片事件
        imgAddFn(pos, $file) {
            // console.log(filename, imgfile)
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            // console.log(formdata)
            formdata.append('image', $file);
            axios({
                url: 'http://101.34.40.159:5005/my/images/image',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': getToken() },
            }).then((url) => {
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                /**
                * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                */
                // $vm.$img2Url(pos, url);
                console.log(url.data.status)
                if (url.data.status !== '0') {
                    return this.$message.warning('上传服务器失败！')
                }
                this.$message.success('图片上传服务器成功！')
                console.log(url.data)
                this.$refs.md.$img2Url(pos, url.data.data);
                // mavonEditor.$img2Url(pos, url);
            })
        },
        //草稿上传到服务器之前的操作
        save_article_draft() {
            this.$confirm('即将上传该草稿,且不会覆盖之前的草稿，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.save_draft()
            }).catch(() => {
                this.$message({
                    // type: 'info',
                    type: 'success',
                    message: '已取消上传至服务器！'
                });
            });
        },
        //上传到服务器的草稿箱
        async save_draft() {
            //收集信息
            console.log(this.userMsg.id)
            const params = {
                title: '未发布',
                author_id: this.userMsg.id,
                content: this.context
            }
            if (params.content == '') return this.$message.warning('尚未输入有效信息！')
            const result = await reqSendArticleDraftApi(params)
            console.log(result)
            if (result.status) return this.$message.error('服务器异常！上传失败！')
            this.$message.success('上传到服务器成功！')
            this.context = ''
        },

        //上传文章到服务器
        async releaseArticle() {
            console.log(this.html)
            const params = {
                title: this.form.name,
                content: this.context,
                cate_id: this.form.region,
                cover_img: this.form.hrefdata,
                author_id: this.userMsg.id,
            }
            console.log(this.html);
            // console.log(params)
            if (!(params.title && params.content && params.cate_id && params.cover_img)) return this.$message.error('不能为空哦！')
            const result = await reqReleaseArticleApi(params)
            // console.log(result)
            if (result.status) return this.$message.error(result.message)
            this.$message.success(result.message)
            this.dialogFormVisible = false;
        }
    }
}
</script>
<style scoped>
.headerControl {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
}

.editor {
    height: 100vh;
}

.mavEdit {
    z-index: 0;
}
</style>