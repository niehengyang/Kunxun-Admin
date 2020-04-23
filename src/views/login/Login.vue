<template>
    <div>登录页
    <el-button type="primary" @click="handleLogin">登录</el-button></div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                loginForm: {
                    username: '',
                    password: '',
                },
            }
        },
        methods:{

            handleLogin(){
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('Login', this.loginForm).then(res => {
                            this.$router.push({ path: '/dashboard/dashboard' })
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
