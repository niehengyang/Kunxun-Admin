<template>
    <el-row>
        <el-row class="tool-bar">
            <el-button type="primary" size="medium" class="add-btn" @click="handleAdd">添加</el-button>
        </el-row>

        <el-row class="table-box">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    v-loading="tableLoading">
                <el-table-column
                        prop="id"
                        label="ID"
                        width="88">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="create_by"
                        label="创建者">
                    <template slot-scope="scope">
                        <div>{{scope.row.admin? scope.row.admin.name: '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="guard_name"
                        label="警卫">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="描述">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
                        <el-tag v-else type="info">禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="创建时间">
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作"
                        width="140px">
                    <template slot-scope="scope">
                        <!-- <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button> -->
                        <el-button @click="handleEdit(scope.row.id)" type="text" size="small">编辑</el-button>
                        <el-button @click="handleDelete(scope.row.id)" style="color: red" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>


        <el-row class="pagination-box">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    background
                    :page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNumber">
            </el-pagination>
        </el-row>

        <el-row class="dialog-box">
            <el-dialog
                    title="添加角色"
                    :modal-append-to-body="false"
                    :visible.sync="addVisible"
                    modal="false"
                    width="50%"
                    :before-close="handleCloseAdd">
                <create-component v-on:closeAdd="handleCloseAdd" v-on:submitCreate="submitCreate"></create-component>
            </el-dialog>

            <el-dialog
                    title="编辑角色"
                    :modal-append-to-body="false"
                    :visible.sync="editVisible"
                    width="50%"
                    :before-close="handleCloseEdit">
                <edit-component v-on:closeEdit="handleCloseEdit" :init-loading="editFormLoading" :edit-data="editForm" v-on:submitEdit="submitEdit"></edit-component>
            </el-dialog>
        </el-row>
        <router-view></router-view>
    </el-row>
    
</template>

<script>
    import CreateComponent from './Create.vue';
    import EditComponent from './Edit.vue';
    export default {
        name: "Index",
        data(){
            return{
                tableLoading: false,
                tableData: [],

                pageSize: 10,
                currentPage: 1,
                totalNumber: 0,

                addVisible:false,
                editVisible: false,
                editFormLoading: false,
                editForm: {},
            }
        },
        components:{
            'create-component': CreateComponent,
            'edit-component': EditComponent
        },
        created(){
            // this.initData()
        },
        methods:{

            //加载数据
            initData(){

                let params = {
                    pageSize: this.pageSize,
                    page: this.currentPage,
                };
                this.tableLoading = true;
                this.$api.restfulApi.list('role/list',params).then((res)=>{
                    this.tableData = res.data;
                    this.tableLoading = false;
                });
            },

            //添加
            handleAdd(){
                this.addVisible = true;
            },

            //提交成功
            submitCreate(){
                this.addVisible = false;
                this.initData();
            },
            //关闭添加
            handleCloseAdd(){
                this.addVisible = false;
            },

            //查看
            handleView(row){

            },

            //删除
            handleDelete(id){
                this.$confirm('确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$api.restfulApi.delete('role/delete',id).then((res)=>{
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        this.initData();
                    });

                }).catch(() => {
                    console.log('取消删除');
                });
            },

            //编辑
            handleEdit(id){
                this.editVisible = true;
                this.editFormLoading = true;
                this.$api.restfulApi.item('role/item',id).then((res)=>{
                    this.editForm = JSON.parse(JSON.stringify(res.data));
                    this.editFormLoading = false;
                });
            },

            //关闭编辑
            handleCloseEdit(){
                this.editVisible = false;
            },

            //编辑提交
            submitEdit(){
                this.editVisible = false;
                this.initData();
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped>
    .add-btn{
        float: left;
    }
</style>