<template>
    <el-row>
        <div class="edit-from">
            <el-form :model="editForm" :rules="rules" ref="editForm" v-loading="formLoading"
                     label-width="100px" class="demo-ruleForm" size="small">

                <el-form-item label="角色名称" prop="name">
                    <el-input class="form-input" maxlength="20" v-model.trim="editForm.name"
                              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入名称"></el-input>
                </el-form-item>

                <el-form-item label="角色警卫" prop="guard_name">
                    <el-input class="form-input"  maxlength="50" v-model.trim="editForm.guard_name" placeholder="请输入警卫"></el-input>
                </el-form-item>

                <el-form-item label="角色状态" prop="status">
                    <el-switch
                            v-model="editForm.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value='1'
                            inactive-value='0'>
                    </el-switch>
                </el-form-item>

                <el-form-item label="其他备注" prop="description">
                    <el-input class="form-input"
                              type="textarea"
                              :rows="2"
                              v-model="editForm.description"
                              maxlength="200"
                              placeholder="请输入备注信息"></el-input>
                </el-form-item>

                <el-form-item label="权限选择" prop="permissions">
                    <el-tree
                            :data="permissionData"
                            show-checkbox
                            node-key="id"
                            ref="permissionTree"
                            highlight-current
                            :props="defaultProps"
                            @check-change="handleCheckChange">
                    </el-tree>
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
                    name: '',
                    status: '',
                    description: '',
                    create_by: '',
                    guard_name: '',
                    permissions: [],
                },
                rules: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur'},
                        { max: 20, message: '名称长度最多20个字符', trigger: 'blur'},
                        { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' , trigger: 'blur'}
                    ],
                    guard_name: [
                        { required: true, message: '请输入警卫', trigger: 'blur'},
                        { max: 100, message: '长度最多100个字符', trigger: 'blur'},
                    ],
                    description: [
                        {max: 200, message: '描述信息不能超过200个字符', trigger: 'blur'}
                    ],
                    status: [
                        { required: true, message: '请选择角色状态', trigger: 'change' }
                    ],
                    permissions: [
                        { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
                    ],

                },
                permissionData: [],
                checkedKeys: [],
                defaultProps: {
                    children: 'children',
                    label: 'display_name'
                }
            }
        },
        props:['editData','initLoading'],

        created(){
            this.editForm = this.editData;
            this.formLoading = this.initLoading;
            this.initPermissionData();
        },
        watch:{
            'editData': function(){
                this.editForm = this.editData;
            },
            'initLoading':function () {
                this.formLoading = this.initLoading;
            }
        },
        methods:{

            //加载菜单权限
            initPermissionData(){
                this.$api.restfulApi.list('permission/menu').then((res)=>{
                    if (res.data){
                        this.permissionData = res.data;
                        this.setCheckedKeys();
                    }else{
                        this.permissionData = [];
                    }
                })
            },

            //提交编辑
            handleSubmitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editLoading = true;
                        this.$api.restfulApi.edit('role/edit',this.editForm.id,this.editForm).then((res)=>{
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

            //选中权限
            handleCheckChange(data, checked, indeterminate) {
                // this.checkedKeys = this.$refs.permissionTree.getCheckedKeys();
                this.editForm.permissions = this.$refs.permissionTree.getCheckedKeys();
                // console.log(this.checkedKeys);
            },

            //加载已含有权限
            setCheckedKeys() {

                this.$refs.permissionTree.setCheckedKeys(this.editForm.permissions);
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