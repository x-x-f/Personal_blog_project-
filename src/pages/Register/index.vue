<template>
    <div class="box">
        <el-card style="text-align:center;">
            <h2>Resgister</h2>
            <div class="fromclass">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="账号" prop="name">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <!--slot="append" -->
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" autocomplete="off">
                            <el-button slot="append" style="color: black;background-color: #fff" v-show="showTime"
                                @click="sendEmail(ruleForm.email)">{{show}}</el-button>
                            <el-button slot="append" style="color: red;background-color: #fff;margin-left: -20px"
                                v-show="!showTime">{{sendTime}}秒</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" v-show="reshowTime">
                        <el-input v-model="ruleForm.code" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="buttons">
                            <el-button type="primary" @click="confirmRegister">注册</el-button>
                            <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                            <el-button type="primary" @click="goLogin">返回</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import { Loading } from 'element-ui';
import { reqSendRegisterApi, reqsendCodeApi } from "@/api"
export default {
    name: 'Register',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        return {
            show: '发送验证码',
            showTime: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
            sendTime: '', /* 倒计时 计数器 */
            timer: null,
            reshowTime: false,
            fullscreenLoading: false,
            ruleForm: {
                username: '',
                pass: '',
                email: '',
                code: ''
            },
            rules: {
                name: [
                    // { required: true, message: '请正确输入账号', trigger: 'blur' },
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                pass: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                email: [
                    { required: true, trigger: 'blur' }
                ],
                code: [
                    { required: true, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        async confirmRegister() {
            if (!(this.ruleForm.username.trim() && this.ruleForm.pass.trim() && this.ruleForm.email.trim() && this.ruleForm.code.trim()))
                return this.$message.error('信息不能为空！')
            const params = {
                username: this.ruleForm.username,
                password: this.ruleForm.pass,
                email: this.ruleForm.email,
                code: this.ruleForm.code
            }
            let loadingInstance = Loading.service({
                fullscreen: false,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let results = await reqSendRegisterApi(params)
            setTimeout(() => {
                if (this.password !== this.repassword) return this.$message.error('两次密码不一样');
                if (results.status) {
                    this.$message.error(results.message);
                    loadingInstance.close();
                } else {
                    if (!results.status) {
                        this.ruleForm.username = ''
                        this.ruleForm.pass = ''
                        this.ruleForm.email = ''
                        this.ruleForm.code = ''
                        this.showTime = true;
                        this.reshowTime = false;
                        this.show = '发送验证码';
                        this.$router.push('/login')
                        this.$message({
                            message: '恭喜你，用户成功注册!',
                            type: 'success'
                        });
                    }
                    loadingInstance.close();
                }

            }, 1500);

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        goLogin() {
            this.$router.push('/login')
        },
        /*发送验证码时，开始计数，一分钟发送一次*/
        async sendEmail(email) {
            let params = {
                username: this.ruleForm.username,
                email: email
            }
            if (!(this.ruleForm.username && this.ruleForm.email.trim()))
                return this.$message.error('邮箱不能为空！')
            // console.log(params)
            const result = await reqsendCodeApi(params)
            // const result = 0
            // console.log(result)
            if (result.status) {
                return this.$message.error(result.message)
            }
            this.reshowTime = true;
            const TIME_COUNT = 60; //  更改倒计时时间
            if (!this.timer) {

                this.sendTime = TIME_COUNT;
                this.showTime = false;
                this.$message({
                    message: '发送验证码成功！',
                    type: 'success'
                })

                this.timer = setInterval(() => {
                    if (this.sendTime > 0 && this.sendTime <= TIME_COUNT) {
                        this.sendTime--;
                    } else {
                        this.showTime = true;
                        this.show = '重新发送'
                        clearInterval(this.timer); // 清除定时器
                        this.timer = null;
                    }
                }, 1000);
            }
        }
    }
}
</script>
<style scoped>
.box {
    height: 100vh;
    /* background-image: url(http://localhost:5005/public/upload_image/article/10_9/b2e5291802faecbb03e186282f_2022_10_9_18_30_9.jpg) !important; */
    /* background: skyblue !important; */
    /* background: #fff !important; */
    /* 页面的背景图片，可以修改 */
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed !important;
    background-size: cover !important;
    -webkit-background-size: cover !important;
    -moz-background-size: cover !important;
    -o-background-size: cover !important;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    background-color: #f8f6f6;
}

.box h2 {
    /* color: rgba(255, 255, 255, 1); */
    color: #000;
    margin-bottom: 20px;
}


.fromclass {
    margin-right: 50px;
}
.buttons{
    width: 240px;
}
</style>