<template>
    <div class="main" :loading="mainLoading">
        <div class="up-img-title">上传头像</div>
        <div class="upload">
            <div class="left">
                <el-avatar :size="60" :src="avatarPath" @error="errorHandler">
                    <img
                            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                    />
                </el-avatar>
            </div>
            <div class="right">
                <el-upload
                        class="upload-demo"
                        action="/api/update/avatar"
                        :headers="{'X-Requested-With': 'XMLHttpRequest', 'authorization': token}"
                        :limit="1"
                        :on-exceed="handleUpExceed"
                        :on-success="upSuccess"
                        :on-error="upError"
                        :file-list="fileList"
                        :show-file-list="false"
                >
                    <el-button class="back-btn" size="small" plain>上传新头像</el-button>
                </el-upload>
            </div>
        </div>
        <el-form
                class="form"
                ref="form"
                :model="form"
                :rules="formRules"
                label-width="100px"
                label-position="right"
        >
            <el-form-item label="用户姓名" prop="username">
                <el-input v-model="form.username" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="loginname">
                <el-input v-model="form.loginname" :disabled="true" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="绑定手机" prop="cellphone">
                <el-input v-model="form.cellphone" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="绑定邮箱" prop="email">
                <el-input v-model="form.email" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right">
            <el-button
                    class="blue-btn"
                    size="medium"
                    type="primary"
                    @click="createFormSubmit"
            >确认修改</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                form: {},
                fileList: [],
                token: "",
                avatarPath: "",
                formRules: {
                    username: [
                        {required: true, message: '用户姓名不能为空', trigger: "blur"},
                        {max: 50, message: '用户名长度不能大于50个字符', trigger: "blur"}
                    ],
                    loginname: [
                        {required: true, message: '登录账号不能为空', trigger: "blur"},
                        {max: 20, message: '登录账号长度不能大于20个字符', trigger: "blur"}
                    ],
                    cellphone: [
                        {required: true, message: '手机号不能为空', trigger: "blur"}
                    ],
                    email: [
                        { required: false, type: 'email', message: '请输入邮箱', trigger: 'blur' }
                    ]
                },
                mainLoading: false
            };
        },
        mounted() {
            // this.token = tokenFactory.getToken();
        },
        created() {
            // this.getInfo();
        },
        methods: {
            getInfo() {
                this.mainLoading = true;

                this.$api.restfulApi.item("admin", this.loginUser.id).then(res => {
                    console.log(res);
                    this.form = res;
                    this.avatarPath = res.avatar_path;
                    this.mainLoading = false;

                    console.log(this.avatarPath);
                }).catch(err => {
                    this.mainLoading = false
                })
            },

            //提交表单
            createFormSubmit() {
                // this.mainLoading=true;
                this.$refs.form.validate(valid => {
                    if (!valid) return;
                    this.$api.restfulApi
                        .edit("admin", this.loginUser.id, this.form)
                        .then(() => {
                            this.$message({
                                message: this.$t("lang.edit-success"),
                                type: "success"
                            });
                            // this.mainLoading=false;
                            // window.location.reload();
                            this.getInfo();
                        });
                });
            },
            //文件超出个数限制
            handleUpExceed(files, fileList) {
                this.$message.warning(
                    this.$t("lang.limit-fileNum") +
                    `1，` +
                    this.$t("lang.current-fileNum") +
                    `${files.length} ，` +
                    this.$t("lang.all-fileNum") +
                    `${files.length + fileList.length} `
                );
            },
            //文件上传成功
            upSuccess(response, file, files) {
                console.log(files);
                let res = files[0].response;
                this.avatarPath=res.avatar_path
                this.fileList=[];
            },
            //文件上传失败
            upError(err, file, fileList) {
                // this.form.avatar = "";
                this.fileList=[];
            },
            errorHandler() {
                return true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .main {
        margin: 50px auto 150px;
        width: 360px;
        .up-img-title {
            width: 100px;
            text-align: right;
            padding-right: 12px;
            font-size: 14px;
        }
        .upload {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            height: 80px;
            .left {
                width: 100px;
                text-align: right;
                padding-right: 12px;
            }
            .right {
                margin-right: 0px;
                .upload-file {
                    .el-upload {
                        width: auto;
                    }
                }
                .back-btn{
                    border:1px solid #409EFF;
                    background:rgba(108,175,254,0);
                    color:rgba(20,125,249,1);
                }
                .back-btn:hover{
                    background: #409EFF;
                    color: #fff;
                }
            }
        }
        .form {
            margin-top: 10px;
            width: 100%;
            .el-form-item {
                .el-input__inner {
                    width: 260px;
                }
            }
        }
    }
</style>
