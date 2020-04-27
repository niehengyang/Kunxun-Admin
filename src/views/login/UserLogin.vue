<template>
    <el-form class="login-form" :rules="loginRules" ref="loginForm" :model="loginForm">
        <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user"
                      size="small"
                      @keyup.enter.native="handleLogin('loginForm')"
                      v-model="loginForm.username"
                      auto-complete="off"
                      placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock"
                      size="small"
                      @keyup.enter.native="handleLogin('loginForm')"
                      show-password
                      v-model="loginForm.password"
                      auto-complete="off"
                      placeholder="请输入密码">
            </el-input>
        </el-form-item>
        <el-checkbox v-model="checked">记住账号</el-checkbox>
        <el-form-item>
            <el-button type="primary"
                       size="small"
                       @click.native.prevent="handleLogin('loginForm')"
                       class="login-submit" :loading="submitLoading">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import CryptoJS from "crypto-js";
    export default {
        name: 'userlogin',
        data() {
            const validateCode = (rule, value, callback) => {
                if (this.code.value !== value) {
                    this.loginForm.code = '';
                    this.refreshCode();
                    callback(new Error('请输入正确的验证码'))
                } else {
                    callback()
                }
            };
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                submitLoading: false,
                checked: false,
                code: {
                    src: '',
                    value: '',
                    len: 4,
                    type: 'text'
                },
                loginRules: {
                    username: [
                        { required: true, trigger: 'blur', message: '用户名不能为空' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
                        { required: true, trigger: 'blur', validator: validateCode }
                    ]
                }
            }
        },
        created() {

        },
        mounted() {},
        computed: {

        },
        props: [],
        methods: {
            handleLogin(formName) {
                let pwd = false;
                let iv = '1234567890123456';
                let key = '1234567890654321';
                let oldPwd = this.loginForm.password;

                pwd = this.encrypt(oldPwd,key,iv);

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitLoading = true;
                        // 通过验证
                        if (pwd){
                            this.loginForm.password = pwd;
                            this.$store.dispatch('Login', this.loginForm).then(res => {
                                this.submitLoading = false;
                                window.location.href = '/';
                            }).catch( (error) =>{
                                let message = "程序错误!";
                                if(error.response){
                                    message =  error.response.data.message;
                                    // 打印错误信息
                                    this.$message({
                                        message: message,
                                        type: 'error'
                                    });
                                }
                                this.submitLoading = false;
                                this.loginForm.password = oldPwd;
                                // this.getCaptcha();
                            })
                        }else{
                            //加密错误
                            this.submitLoading = false;
                            this.loginForm.password = oldPwd;
                            this.$message({
                                message: '加密错误',
                                type: 'error'
                            });
                        }
                    }
                })
            },

            /**
             * 接口数据加密函数
             * @param str string 需加密的json字符串
             * @param key string 加密key(16位)
             * @param iv string 加密向量(16位)
             * @return string 加密密文字符串
             */
            encrypt(str, key, iv){
                //密钥16位
                let keyd = CryptoJS.enc.Utf8.parse(key);
                //加密向量16位
                let ivd = CryptoJS.enc.Utf8.parse(iv);

                let encrypted = CryptoJS.AES.encrypt(str, keyd, {
                    iv: ivd,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.ZeroPadding
                }).toString();
                return encrypted;
            },

        }
    }
</script>
<style>
</style>
