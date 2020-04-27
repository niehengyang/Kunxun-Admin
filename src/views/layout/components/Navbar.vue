<template>
    <div class="nav-bar">
        <div>
            logo
        </div>
        <div>
            <el-dropdown>
                <span class="el-dropdown-link">
                   <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'navBar',
        components: {

        },
        computed: {

        },
        methods: {
            handleLogout(){
                this.$store.dispatch('LogOut').then(res => {
                    console.log(res);
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nav-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
}

</style>
