<template>
    <div class="box">
        <el-card style="text-align:center;">
            <h2>Login</h2>
            <div class="fromclass">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="账号" prop="name">
                        <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input prefix-icon="el-icon-lock" type="password" show-password="true"
                            v-model="ruleForm.pass" autocomplete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item style="margin-bottom:0;">
                        <div class="buttons">
                            <el-button type="primary" @click="goHome">提交</el-button>
                            <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                            <el-button type="primary" @click="goRegister">注册</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-top:0;text-align:right">
                        <el-button style="" type="text" @click="goHomepage">暂不登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import { mapState } from 'vuex'
// import { Loading } from 'element-ui';
export default {
    name: 'Login',
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
            ruleForm: {
                username: '',
                pass: '',
            },
            rules: {
                name: [
                    // { required: true, message: '请正确输入账号', trigger: 'blur' },
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                pass: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ]
            },
            userInfo: ''

        }
    },
    created() {
        var lett = this;
        document.onkeydown = function (e) {
            var key = window.event.keyCode;
            if (key == 13) {
                lett.goHome();
            }
        }

    },
    mounted() {
    },
    computed: {
        ...mapState({ tokenInfo: (state) => state.Login.tokenInfo }),
        ...mapState({ login: (state) => state.Login.login }),
        ...mapState({ errors: (state) => state.Login.errors })

    },
    watch: {
        //当login值发生变化是进行路由跳转
        // immediate:true,
        login() {
            this.$router.push('/homepage');
            this.$message({ message: '恭喜你，成功登录！', type: 'success' });
            this.userInfo = JSON.parse(localStorage.getItem('userMsg'));
            // console.log('@@@@@', this.userInfo)
            this.$bus.$emit('userInfo', this.userInfo)
        },
        errors() {
            // console.log(this.errors)
            this.$message.error(this.errors[this.errors.length - 1])
        }
    }
    ,
    methods: {
        goHome() {
            const params = {
                username: this.ruleForm.username.trim(),
                password: this.ruleForm.pass.trim()
            }
            if (params.username && params.password) {
                this.$store.dispatch('sendLogin', params)
            } else {
                this.$message.error('账号或密码不能为空！')
            }

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        goRegister() {
            this.$router.push("/register")
        },
        goHomepage() {
            this.$router.push("/homepage")
        }
    }
}
</script>
<style scoped>
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/


.box {
    height: 100vh;
    /* background-image: url(http://localhost:5005/public/upload_image/article/10_9/e57b08aeda927adcb99640a116_2022_10_9_18_30_44.jpg) !important; */
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

.buttons { 
    width: 240px;
}
</style>