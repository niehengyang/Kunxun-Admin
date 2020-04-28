<template>
    <div>
        <!--工具条-->
        <el-row class="tool-bar">
            <el-button class="add-btn" size="medium" type="primary" @click="handleAdd">添加</el-button>
        </el-row>

        <!--表格-->
        <el-row class="table-box" :loading="tableLoading">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    row-key="uid"
                    lazy
                    :load="load"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

                <el-table-column
                        type="index">
                </el-table-column>

                <el-table-column
                        prop="name"
                        label="菜单名称"
                        width="180">
                </el-table-column>

                <el-table-column
                        label="路由">
                    <template slot-scope="scope">
                        <span v-if="scope.row.router == null">--</span>
                        <span v-else>{{scope.row.router}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="uid"
                        label="uid">
                </el-table-column>
                <el-table-column
                        prop="icon"
                        label="图标">
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="sort"-->
<!--                        label="排序">-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="status"
                        label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
                        <el-tag v-else type="info">禁用</el-tag>
                    </template>
                </el-table-column>
<!--                <el-table-column-->
<!--                        prop="created_at"-->
<!--                        label="创建时间"-->
<!--                        width="180">-->
<!--                </el-table-column>-->
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   @click="handleAdd(scope.$index, scope.row.uid)"
                        >添加</el-button>
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>


<!--        <el-row class="pagination-box">-->
<!--            <el-pagination-->
<!--                    @size-change="handleSizeChange"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    :current-page="currentPage"-->
<!--                    background-->
<!--                    :page-size="pageSize"-->
<!--                    :page-sizes="[10, 20, 30, 40]"-->
<!--                    layout="total, sizes, prev, pager, next, jumper"-->
<!--                    :total="totalNumber">-->
<!--            </el-pagination>-->
<!--        </el-row>-->

        <el-row class="dialog-box">
            <el-dialog
                    title="添加权限"
                    :visible.sync="addVisible"
                    :modal-append-to-body='false'
                    width="50%"
                    :before-close="handleCloseAdd">
                <create-component :addUid="addUid" v-on:closeAdd="handleCloseAdd" v-on:submitCreate="submitCreate"></create-component>
            </el-dialog>

            <el-dialog
                    title="编辑权限"
                    :visible.sync="editVisible"
                    :modal-append-to-body='false'
                    width="50%"
                    :before-close="handleCloseEdit">
                <edit-component v-on:closeEdit="handleCloseEdit" :init-loading="editFormLoading" :edit-data="editForm" v-on:submitEdit="submitEdit"></edit-component>
            </el-dialog>
        </el-row>

    </div>
</template>

<style>

</style>
<script>
    import CreateComponent from './component/Create.vue';
    import EditComponent from './component/Edit.vue';
    export default {
        name: "Index",
        data(){
            return{
                tableLoading: false,
                tableData: [],

                pageSize: 10,
                currentPage: 1,
                totalNumber: 0,

                addVisible: false,

                editForm: {},
                editFormLoading: false,
                editVisible: false,
                addUid: ''

            }
        },
        components:{
            'create-component': CreateComponent,
            'edit-component': EditComponent
        },
        created() {
            this.initData();
        },
        methods:{

            initData(){
                let params = {
                    pageSize: this.pageSize,
                    page: this.currentPage
                };
                this.tableLoading = true;
                this.$api.restfulApi.list('web/menu',params).then((res)=>{
                    this.tableData = res.data;
                    this.currentPage = res.paginate.current_page;
                    this.totalNumber = res.paginate.total;
                    this.tableLoading = false;
                }).catch(()=>{});
            },

            load(tree, treeNode, resolve) {
                let params = {
                    parentId: tree.id
                };
                this.$api.restfulApi.list('permission/nodes',params).then((res)=>{
                    resolve(res.data);
                });
            },

            //添加
            handleAdd(index, uid){
                console.log(index, uid)
                this.addUid = uid
                console.log('addUid', this.addUid)
                this.addVisible = true;
            },


            //关闭添加
            handleCloseAdd(){
                this.addVisible = false;
            },

            //编辑
            handleEdit(index,id){
                this.editVisible = true;
                // this.editForm = JSON.parse(JSON.stringify(row));
                this.editFormLoading = true;
                this.$api.restfulApi.item('permission/item',id).then((res)=>{
                    this.editForm = JSON.parse(JSON.stringify(res.data));
                    this.editFormLoading = false;
                })
            },

            //关闭编辑
            handleCloseEdit(){
                this.editVisible = false;
            },

            //创建完成
            submitCreate(val){
                this.addVisible = false;
                if (val == 'nav'){
                    window.location.href = '/menu/list';
                }else {
                    this.initData();
                }

                console.log(val);
            },

            //编辑提交
            submitEdit(val){
                this.editVisible = false;
                if (val == 'nav'){
                    window.location.href = '/menu/list';
                }else {
                    this.initData();
                }
                console.log(val);
            },

            //删除
            handleDelete(index,row){
                this.$confirm('确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$api.restfulApi.delete('permission/delete',row.id).then((res)=>{
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        if (row.type == 'nav'){
                            window.location.href = '/menu/list';
                        }else{
                            this.initData();
                        }

                    });

                }).catch(() => {
                    console.log('取消删除');
                });
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
    }
</script>

<style scoped>
    .add-btn{
        float: left;
    }
    .pagination-box{
        width: 100%;
        text-align: right;
    }
</style>
