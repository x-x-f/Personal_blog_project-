<!-- 个人中心模块 -->
<template>
    <div>
        <el-row :gutter="20">
            <el-col width="100%">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" style="text-align:center">
                            <span class="header">个人中心</span>
                        </div>
                        <ul>
                            <li class="avaterlist">
                                <div class="avatars">
                                    <!-- 头像 -->
                                    <div>
                                        <span>头像:</span>
                                        <el-avatar style="width:100px;height:100px; vertical-align: middle;"
                                            :src=userInfo.user_pic />
                                        <span style="font-size:12px"
                                            v-show="userInfo.user_pic===''? true:false">还没有设置头像哦</span>
                                    </div>
                                    <!-- 上传头像 -->
                                    <div>
                                        <!-- drag :headers="headers" -->
                                        <!-- http-request	覆盖默认的上传行为，可以自定义上传的实现 -->
                                        <el-upload class="upload-demo el-upload-dragger" drag :action="interfaceUrl"
                                            :http-request="upLoad" :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload" multiple>
                                            <i class="el-icon-upload"></i>
                                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                        </el-upload>
                                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
                                    </div>
                                </div>
                                <div class="right_button">
                                    <el-button type="primary" round>修改密码</el-button>
                                    <el-button type="primary" round @click="dialogFormVisible = true">编辑资料</el-button>
                                    <el-dialog title="编辑资料" :visible.sync="dialogFormVisible">
                                        <el-form>
                                            <el-form-item label="昵称" :label-width="formLabelWidth"
                                                style="margin-left:-85px;">
                                                <el-input type="text" placeholder="请输入内容" v-model="nickname"
                                                    maxlength="10" show-word-limit>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="手机号" :label-width="formLabelWidth"
                                                style="margin-left:-85px;">
                                                <el-input type="text" placeholder="请输入内容" v-model="phone" maxlength="11"
                                                    show-word-limit>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="简介" :label-width="formLabelWidth"
                                                style="margin-left:-85px;">
                                                <el-input type="textarea" placeholder="请输入内容" v-model="recommend"
                                                    maxlength="150" show-word-limit>
                                                </el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="updateUserInfo">确 定</el-button>
                                        </div>
                                    </el-dialog>

                                </div>
                            </li>
                            <li class="">
                                <span> 账号：</span>{{userInfo.username}}
                            </li>
                            <li class="">
                                <span> UID:</span>{{userInfo.id}}
                            </li>
                            <li class="">
                                <span> 昵称：</span>{{userInfo.nickname}}
                            </li>
                            <li class="">
                                <span> 手机号：</span>{{userInfo.phone}}
                            </li>
                            <li class="">
                                <span> 邮箱：</span>{{userInfo.email}}
                                <div class="span_email">
                                    <el-button type="text">更改邮箱</el-button>
                                </div>
                            </li>
                            <li class="">
                                <span> 注册时间：</span>{{userInfo.regsiterdate}}

                            </li>
                            <li class="">
                                <span> 简介：</span>{{userInfo.recommend}}
                            </li>
                        </ul>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { reqUpdateUserInfoApi } from '@/api'
// import { mapState } from 'vuex'
import { Loading } from 'element-ui';
import { getToken } from '@/utils/storage'
import axios from 'axios';
export default {
    name: 'UserMsg',
    data() {
        return {
            userInfo: '',
            interfaceUrl: 'http://101.34.40.159:5005/my/update/avatar',//上传后台的接口地址
            imageUrl: '',
            headers: {
                Authorization: getToken()
            },
            avatar: '',
            load: '',
            dialogFormVisible: false,
            formLabelWidth: '120px',
            nickname: '',
            phone: '',
            recommend: ''
        }
    },
    mounted() {
        if (localStorage.getItem('userMsg')) {
            this.userInfo = JSON.parse(localStorage.getItem('userMsg'))
        } else {
            this.$store.dispatch('reqGetLoginInfo')
        }
    },
    computed: {
        // ...mapState({ userMsg: (state) => state.Login.userMsg })
    },
    methods: {
        isPhone() {
            var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if (this.userMsg.phone == 11) {
                if (!reg.test(this.number)) {
                    // this.isShow = true;
                    console.log('电话号码格式不正确！');
                } else {
                    this.disabled = false;
                    console.log('电话号码输入正确！');
                }
            } else {
                // this.disabled = true;
                // this.isShow = false;
            }
        },
        //更新用户信息事件
        async updateUserInfo() {
            this.dialogFormVisible = false;
            //整合参数
            const params = {
                nickname: this.nickname,
                phone: this.phone,
                recommend: this.recommend
            }
            if (!params.nickname || !params.phone || !params.recommend) return this.$message.error('数据不能为空！~');
            let loadingInstance = Loading.service({
                fullscreen: false,
                text: '服务器链接中...',
            });
            let result = await reqUpdateUserInfoApi(params)
            setTimeout(() => {
                if (result.status) {
                    this.$message.error(result.message + '更新用户信息失败!');
                    loadingInstance.close();
                } else {
                    this.$store.dispatch('reqGetLoginInfo')
                    loadingInstance.close();
                    this.$message({
                        message: '成功更新用户信息！',
                        type: 'success'
                    });
                    this.userInfo.nickname = params.nickname;
                    this.userInfo.phone = params.phone;
                    this.userInfo.recommend = params.recommend;
                }
            }, 1500);
        },
        // 点击更换头像
        handleAvatarSuccess(res, file) {
            // 这句话就是连接后台服务器的
            this.avatar = URL.createObjectURL(file.raw)
            //     console.log("kkkkkkkkk111")
            console.log("handleAvatarSuccess", this.avatar)
            //     console.log("kkkkkkkkk222")
        },
        //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
        beforeAvatarUpload(file) {

            const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!")
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!")
            }
            // return (isJPG || isPNG) && isLt2M
            return isJPG && isLt2M

        },
        upLoad(file) {
            // console.log("aaaaaaaaaaaaa", file)
            const formData = new FormData()//通过form数据格式来传
            formData.append("file", file.file) //传文件
            // console.log("bbbbbbbbbbbbb", formData)
            this.open(formData)
        },
        open(formData) {
            this.$confirm('此操作将上传该图片, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                axios({
                    url: this.interfaceUrl,
                    method: 'post',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': getToken() },
                }).then((res) => {
                    console.log(res);
                    console.log('上传成功')
                    if (res.data.status == "0") {
                        this.$message.success('头像上传成功')
                        this.avatar = res.data.data;
                        this.userInfo.user_pic = this.avatar
                        this.$bus.$emit('userInfo', this.userInfo)
                        localStorage.setItem("userMsg", JSON.stringify(this.userInfo))
                        // console.log(this.avatar)
                    } else {
                        this.$message('头像上传失败')
                    }
                })
            }).catch(() => {
                this.$message({
                    // type: 'info',
                    type: 'success',
                    message: '已取消上传'
                });
            });
        },

    }
}
</script>
<style scoped lang="less">
.header {
    margin-right: 10vw;
    font-size: 24px;
    font-weight: 700;
}

ul li {
    position: relative;
    font-size: 16px;
    text-align: left;
    padding: 20px 5px;
    // 不予许换行
    white-space: nowrap;
    border-bottom: 1px solid #ddd;
}

ul li span {

    font-size: 18px;
    padding-right: 20px;
}

.span_email {
    position: absolute;
    top: 0;
    right: 0;
}

.avaterlist {
    position: relative;
    height: auto;
    overflow: hidden;
}

.avatars {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
}

// drag,
.el-upload-dragger {
    // width: 220px;
    height: 120px;
}

.el-icon-upload {
    margin-top: 1vw;
}

.el-upload__tip {
    color: red;
}

.right_button {
    position: absolute;
    top: 0;
    right: 0;
}

//卡片样式
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
    height: 100%;
}

.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    // min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>