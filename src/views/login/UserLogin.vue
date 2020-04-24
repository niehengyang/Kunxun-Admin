<template>
    <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
        <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user"
                      size="small"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.username"
                      auto-complete="off"
                      placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock"
                      size="small"
                      @keyup.enter.native="handleLogin"
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
                       @click.native.prevent="handleLogin"
                       class="login-submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { isvalidUsername } from '@/utils/validate'
    export default {
        name: 'userlogin',
        data() {
            const validateCode = (rule, value, callback) => {
                if (this.code.value !== value) {
                    this.loginForm.code = ''
                    this.refreshCode()
                    callback(new Error('请输入正确的验证码'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
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
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('Login', this.loginForm).then(res => {
                            this.$router.push({ path: '/' })
                        })
                    }
                })
            }
        }
    }
</script>
<style>
</style>
