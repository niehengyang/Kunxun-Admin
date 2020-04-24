<template>
    <el-row>
        <div class="add-from">
            <el-form :model="addForm" :rules="rules" ref="addForm"
                     label-width="100px" class="demo-ruleForm" size="small">
                <el-form-item label="菜单名称" prop="name">
                    <el-input class="form-input" v-model="addForm.name" placeholder="请输入菜单名称"></el-input>
                </el-form-item>

                <el-form-item label="显示名称" prop="display_name">
                    <el-input class="form-input" v-model="addForm.display_name" placeholder="请输入菜单显示名称"></el-input>
                </el-form-item>

                <el-form-item label="上级菜单" prop="parent_id">
                    <el-select class="form-input" v-model="addForm.parent_id" placeholder="请选择上级菜单" @visible-change="handleMenuOption">
                        <el-option v-for="permission in permissionOptions" :label="permission.display_name" :value="permission.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="路由/Router" prop="route">
                    <el-input class="form-input" v-model="addForm.route" placeholder="请输入路由（/*）"></el-input>
                </el-form-item>

                <el-form-item label="菜单性质" prop="type">
                    <el-radio-group v-model="addForm.type" @change="handleChangeType">
                        <el-radio label="nav">导航</el-radio>
                        <el-radio label="api">API</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="导航图标" prop="icon" v-if="addForm.type == 'nav'">
                    <el-input class="form-input" v-model="addForm.icon" placeholder="请输入导航图标"></el-input>
                </el-form-item>

                <el-form-item label="导航标识" prop="index_value" v-if="addForm.type == 'nav'" :rules="[
                        { required: true, message: '请输入导航标识', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]">
                    <el-input class="form-input" v-model="addForm.index_value" placeholder="请输入导航标识"></el-input>
                    <el-row class="annotation-item"><span style="color: red">注：</span>该参数将用于导航定位，请与路由name相同</el-row>
                </el-form-item>

                <el-form-item label="状态" prop="status">
                    <el-switch
                            v-model="addForm.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value='1'
                            inactive-value='0'>
                    </el-switch>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input class="form-input" v-model="addForm.sort" placeholder="请输入排序号"></el-input>
                </el-form-item>

            </el-form>
        </div>

       <div class="dialog-footer">
        <span style="float: right">
            <el-button @click="handleFormClose('addForm')">取 消</el-button>
            <el-button type="primary" @click="handleSubmitForm('addForm')" :loading="addLoading">提 交</el-button>
        </span>
       </div>
    </el-row>
</template>

<script>
    export default {
        name: "create",
        data(){
            return{
                addLoading: false,
                addForm: {
                    index_value: '',
                    name: '',
                    display_name: '',
                    parent_id: 0,
                    route: '',
                    type: 'nav',
                    icon: '',
                    status: '1',
                    sort: 1,
                },
                rules: {
                    name: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
                    ],
                    display_name: [
                        { required: true, message: '请输入菜单显示名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                    ],
                    route: [
                        { required: true, message: '请填写路由地址', trigger: 'blur' },
                        { min: 1, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择菜单性质', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择菜单状态', trigger: 'change' }
                    ]
                },

                permissionOptions: [
                    {id: 0, display_name: '无'}
                ],
            }
        },

        props: {

        },
        watch:{

        },
        created(){

        },
        methods:{

            //提交创建
            handleSubmitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addLoading = true;
                        let type = this.addForm.type;
                        this.$api.restfulApi.create('permission/create',this.addForm).then((res)=>{
                            this.handleFormClose(formName);
                            this.$message.success({showClose: true, message: res.msg, duration: 2000});
                            this.$emit('submitCreate',type);
                        });
                    }
                });
            },

            //关闭添加
            handleCloseAdd(){
                this.handleFormClose('addForm');
            },


            //表单关闭
            handleFormClose(formName){
                this.addLoading = false;
                this.$refs[formName].resetFields();
                this.$emit('closeAdd',formName);
            },

            //填充父级菜单
            handleMenuOption(val){
                this.permissionOptions = [{id: 0, display_name: '无'}];
                if (val){
                    this.addForm.parent_id = 0;
                    let params = {
                        type: this.addForm.type
                    };
                    this.$api.restfulApi.list('permission/all',params).then((res)=>{

                        this.permissionOptions = this.permissionOptions.concat(res.data);
                    });
                }
            },

            //更换性质
            handleChangeType(val){
                this.permissionOptions = [{id: 0, display_name: '无'}];
                this.addForm.parent_id = 0;
                this.addForm.index_value = '';
                this.addForm.icon = '';
            },
        }
    }
</script>

<style scoped>
    .add-from{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .form-input{
        width: 260px;
    }
    .annotation-item{
        width: 260px;
        font-size: 1px;
        text-indent: 0.5px;
    }
</style>