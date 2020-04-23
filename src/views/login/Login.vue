<template>
    <div>登录页</div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{

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
