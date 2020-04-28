<template>
    <el-row>
        <div class="edit-from">
            <el-form :model="editForm" :rules="rules" ref="editForm"
                     label-width="100px" class="demo-ruleForm" size="small">
                <el-form-item label="用户名" prop="username">
                    <el-input class="form-input" maxlength="20" v-model.trim="editForm.username"
                              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="所属角色" prop="roleIds">
                    <el-select class="form-input" v-model="editForm.roleIds" multiple  placeholder="请选择角色" @visible-change="handleRoleOptions">
                        <el-option v-for="role in roleOptions" :label="role.name" :value="role.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="姓名" prop="name">
                    <el-input class="form-input" v-model="editForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="手机号码" prop="phone">
                    <el-input class="form-input" type="tel"
                              v-model="editForm.phone"
                              placeholder="请输入境内手机号码: 123-6666-6666">
                        <template slot="prepend">+86</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input class="form-input"  maxlength="100" type="email" v-model.trim="editForm.email" placeholder="请输入电子邮箱地址"></el-input>
                </el-form-item>

                <el-form-item label="其他备注" prop="desc">
                    <el-input class="form-input"
                              type="textarea"
                              :rows="2"
                              v-model="editForm.desc"
                              maxlength="200"
                              placeholder="请输入备注信息"></el-input>
                </el-form-item>

            </el-form>
        </div>

        <div class="dialog-footer">
        <span style="float: right">
            <el-button @click="handleFormClose('editForm')">取 消</el-button>
            <el-button type="primary" @click="handleSubmitForm('editForm')" :loading="editLoading">提 交</el-button>
        </span>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "edit",
        data(){
            return{
                formLoading: false,
                editLoading: false,
                editForm: {
                    username: '',
                    name: '',
                    phone: '',
                    email: '',
                    desc: '',
                    roleIds: []
                },
                rules: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur'},
                        { max: 20, message: '用户名长度最多20个字符', trigger: 'blur'},
                        { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' , trigger: 'blur'}
                    ],
                    name: [
                        { required: true, message: '用户姓名不能为空', trigger: 'blur'},
                        { max: 30, message: '用户姓名长度最多30个字符', trigger: 'blur'}
                    ],
                    phone: [
                        { required: true, message: '请输入正确的手机号码',pattern: /^1(3|4|5|7|8)\d{9}$/,trigger: 'blur'}
                    ],
                    email: [
                        { type: 'email', required: true, message: '请输入正确的电子邮箱地址', trigger: 'blur'},
                        { max: 100, message: '用邮箱地址长度最多100个字符', trigger: 'blur'},
                    ],
                    desc: [
                        {max: 200, message: '描述信息不能超过200个字符', trigger: 'blur'}
                    ],
                    roleIds: [
                        { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
                    ],

                },
                roleOptions: [],
            }
        },
        props:['editData','initLoading'],

        created(){
            this.editForm = this.editData;
            this.formLoading = this.initLoading;
        },
        watch:{
            'editData': function(){
                this.editForm = this.editData;
                this.roleOptions = this.editData.roles;
            },
            'initLoading':function () {
                this.formLoading = this.initLoading;
            }
        },
        methods:{

            //获取角色
            handleRoleOptions(val){
                if (val){
                    let params = {
                        pageSize: 100
                    };
                    this.$api.restfulApi.list('role/list',params).then((res)=>{
                        this.roleOptions = res.data;
                    });
                }

            },

            //提交编辑
            handleSubmitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editLoading = true;
                        this.$api.restfulApi.edit('account/edit',this.editForm.id,this.editForm).then((res)=>{
                            this.handleFormClose(formName);
                            this.$message.success({showClose: true, message: res.msg, duration: 2000});
                            this.$emit('submitEdit',this.editData.type);
                        });
                    }
                });
            },

            //关闭添加
            handleCloseAdd(){
                this.handleFormClose('editForm');
            },


            //表单关闭
            handleFormClose(formName){
                this.editLoading = false;
                this.$refs[formName].resetFields();
                this.$emit('closeEdit',formName);
            },
        }
    }
</script>

<style scoped>
    .edit-from{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .form-input{
        width: 260px;
    }
</style>