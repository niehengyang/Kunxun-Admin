<template>
    <el-row>
        <div class="add-from">
            <el-form :model="addForm" :rules="rules" ref="addForm"
                     label-width="100px" class="demo-ruleForm" size="small">
                <el-form-item label="用户名" prop="username">
                    <el-input class="form-input" maxlength="20" v-model.trim="addForm.username"
                              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">

                    <el-input
                        class="form-input" type="password"
                        maxlength="30"
                        v-model.trim="addForm.password"
                        onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
                        placeholder="密码默认：123456"
                        :type="pwdType"
                    >
                        <i v-if="pwdType == 'password'" class="el-icon-lock" slot="suffix" @click="changePass()"></i>
                        <i v-else class="el-icon-unlock" slot="suffix" @click="changePass()"></i>
                    </el-input>
                </el-form-item>

                <el-form-item label="所属角色" prop="roles">
                    <el-select class="form-input" v-model="addForm.roles" multiple  placeholder="请选择角色" @visible-change="handleRoleOptions">
                        <el-option v-for="role in roleOptions" :label="role.name" :value="role.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="姓名" prop="name">
                    <el-input class="form-input" v-model="addForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="手机号码" prop="phone">
                    <el-input class="form-input" type="tel"
                        v-model="addForm.phone"
                        placeholder="请输入境内手机号码: 123-6666-6666">
                        <template slot="prepend">+86</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input class="form-input"  maxlength="100" type="email" v-model.trim="addForm.email" placeholder="请输入电子邮箱地址"></el-input>
                </el-form-item>

                <el-form-item label="其他备注" prop="desc">
                    <el-input class="form-input"
                        type="textarea"
                        :rows="2"
                        v-model="addForm.desc"
                        maxlength="200"
                        placeholder="请输入备注信息"></el-input>
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
    import CryptoJS from "crypto-js";
    export default {
        name: "create",
        data() {
            return {
                addLoading: false,
                addForm: {
                    username: '',
                    password: '',
                    name: '',
                    phone: '',
                    email: '',
                    desc: '',
                    roles: [],
                },
                pwdType: 'password',
                rules: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur'},
                        { max: 20, message: '用户名长度最多20个字符', trigger: 'blur'},
                        { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' , trigger: 'blur'}
                    ],
                    password: [
                        // { required: true, message: '密码不能为空', trigger: 'blur'},
                        { max: 30, message: '用户名长度最多30个字符', trigger: 'blur'},
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
                    roles: [
                        { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
                    ],
                },
                roleOptions: [],
            }
        },

        props: {

        },
        watch: {

        },
        created() {

        },
        methods: {

            //提交创建
            handleSubmitForm(formName) {

                let pwd = false;
                let iv = '1234567890123456';
                let key = '1234567890654321';
                let oldPwd = this.addForm.password;

                if (oldPwd) {
                    pwd = this.encrypt(oldPwd, key, iv);
                } else {
                    pwd = this.encrypt('123456', key, iv);
                }

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        // 通过验证
                        if (pwd) {
                            this.addForm.password = pwd;

                            this.addLoading = true;
                            this.$api.restfulApi.create('account/create', this.addForm).then((res) => {
                                this.handleFormClose(formName);
                                this.$message.success({showClose: true, message: res.msg, duration: 2000});
                                this.$emit('submitCreate', true);
                            }) .catch(() =>{
                                this.addForm.password = oldPwd;
                            });
                        } else {

                            //加密错误
                            this.addForm.password = oldPwd;
                            this.$message({
                                message: '加密错误',
                                type: 'error'
                            });
                        }
                    }
                });
            },

            //控制密码显示
            changePass() {
                if (this.pwdType === 'password') this.pwdType = '';
                else this.pwdType = 'password';
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

            //获取角色
            handleRoleOptions(val){
                if (val) {
                    let params = {
                        pageSize: 100
                    };
                    this.$api.restfulApi.list('role/list', params).then((res) => {
                        this.roleOptions = res.data;
                    });
                }

            },

            //关闭添加
            handleCloseAdd() {
                this.handleFormClose('addForm');
            },


            //表单关闭
            handleFormClose(formName) {
                this.addLoading = false;
                this.$refs[formName].resetFields();
                this.$emit('closeAdd', formName);
            }
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

    .el-icon-lock {
        cursor: pointer;
    }
    .el-icon-unlock{
        cursor: pointer;
    }
</style>