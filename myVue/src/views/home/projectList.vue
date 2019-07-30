<template>
	<div class="projectList" v-loading="loading">
        <div class="search">
            <!-- 时间筛选：<el-date-picker
                v-model="getSearch.date"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']">
            </el-date-picker>
            <br /><br /> -->
            请求方式： <el-select v-model="getSearch.method">
                        <el-option label="" value=""></el-option>
                        <el-option label="get" value="get"></el-option>
                        <el-option label="post" value="post"></el-option>
                        <el-option label="put" value="put"></el-option>
                        <el-option label="delete" value="delete"></el-option>
                    </el-select>
            &nbsp;
            关键字：<el-input placeholder="请输入关键字" style="width: 200px;" v-model="getSearch.key"></el-input>
            <el-button @click="getProjectList" type="primary">搜索</el-button>
            <el-button @click="$router.push({name:'detail'})" type="primary" v-if="isShowButton">新增接口</el-button>
        </div>
        
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="index" label="排序" width="50"></el-table-column>
            <el-table-column prop="name" label="接口名" width=""></el-table-column>
            <el-table-column prop="method" label="请求方式" width=""></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width=""></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="dialog(scope.$index, scope.row.id)" v-if="isShowButton">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer">
            <el-button @click="dialog(null, ids)" style="float: left" v-if="isShowButton">批量删除</el-button>
            <el-pagination
                style="display: inline-block;"
                background
                layout="total, prev, pager, next"
                :total="total"
                :current-page="pageIndex"
                :page-size="pageSize"
                @current-change="currentPage"
            >
            </el-pagination>
        </div>
        <el-dialog
			title="删除"
			:visible="obj.model"
			width="350px"
			:before-close="()=>obj.model = false"
		>
			<p style="display: flex;align-items: center;">
				<span v-html="obj.html"></span>
			</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="obj.model = false">取 消</el-button>
				<el-button type="primary" @click="handleDelete">确 定</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
	export default {
		data() {
            const { userName } = JSON.parse(sessionStorage.getItem('user')) || {};
			return {
                userName,
                uuid: this.$route.params.id,
                loading: false,
                tableData: [],
                tableDatai: 0,
                search: {
                    date: [],
                    method: '',
                    key: ''
                },
                pageIndex: 1,
                pageSize: 10,
                total: 0,
                ids: [],
                obj: {
                    model: false,
                    html: '',
					data: {

                    }
				}
			}
        },
        name: 'projectList',
		methods: {
            ...mapActions([
                'projectList',
                'setSelectMenu',
                'setSearch',
                'setToDetailObj',
                'projectDel'
            ]),
            // 请求接口列表
            async getProjectList() {
                const data = {
                    uuid: this.uuid,
                    key: this.getSearch.key,
                    method: this.getSearch.method,
                    startTime: this.getSearch.date[0],
                    endTime: this.getSearch.date[1],
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
                this.tableData = [];
                this.tableDatai++;
                this.loading = true;
                await this.projectList({
                    data,
                    tableDatai: this.tableDatai,
                    callBack: (data, tableDatai) => {
                        if(tableDatai === this.tableDatai) { // 防止快速多次切换 请求先后返回的问题
                            const { list=[], count=0 } = data || {};
                            this.tableData = list.map((e, index) => {
                                e.index = index * this.pageIndex + 1
                                return e;
                            })
                            this.total = count || 0;
                        }
                    }
                })
                this.loading = false;
            },
            dialog(index, id) {
                let names = '';
                if(id instanceof Array) {
                    if(id.length === 0) return this.$message.warning('请勾选需要删除的接口');
                    else {
                        let arr = [];
                        this.tableData.forEach(element => {
                            if(id.find(e => e === element.id)) arr.push(element.name);
                        });
                        const len = arr.length;
                        names = len > 3 ? (arr.slice(0, 3).join(',') + '等' + len + '项') : arr.join(',');
                    }
                } else {
                    names = this.tableData[index].name;
                }
                this.obj = {
                    model: true,
                    html: `确定删除<span style="color: red">${names}</span>？`,
					data: {
                        index,
                        id
                    }
                }
            },
            // 删除
            async handleDelete() {
                const { index, id } = this.obj.data;
                const data = {
                    id,
                    uuid: this.uuid
                }
                this.loading = true;
                this.obj.model = false;
                await this.projectDel({
                    data,
                    callBack: (data) => {
                        this.$message.success('删除成功');
                        if(index || index === 0) {
                            this.tableData.splice(index, 1);
                            this.total--;
                        } else { // 删除多项
                            this.getProjectList();
                        }
                    }
                })
                this.loading = false;
            },
            // 详情
            handleEdit(index, row) {
                const { id } = row;
                this.setToDetailObj({
                    uuid: this.uuid,
                    id,
                    data: row
                })
                this.$router.push({
                    name: 'detailId',
                    params: {
                        id: id + '_' + this.uuid
                    }
                })
            },
            handleSelectionChange(data) {
                this.ids = data.map(e => e.id);
            },
            // 选择页
            currentPage(index) {
                this.pageIndex = index;
                this.getProjectList();
            }
        },
        computed: {
			...mapGetters([
                'getMenuList',
                'getSelectMenu',
                'getSearch'
            ]),
            isShowButton() {
                if(this.getSelectMenu.length !== 0 && this.getMenuList.length !== 0) {
                    const { userName } = this.getMenuList[this.getSelectMenu[0]];
                    return userName === this.userName;
                }
                return false;
            }
		},
		mounted() {
            if(this.getSelectMenu.length !== 0) {
                this.getProjectList();
            }
        },
        watch: {
            getSelectMenu(val) {
                this.tableData = [];
                this.uuid = this.$route.params.id;
                this.getProjectList();
            },
            // 刷新进入 菜单列表请求完
            getMenuList(val) {
                let arr = [];
                this.getMenuList.map((e, index) => {
                    const findIndex = e.children.findIndex((e2, index2) => e2.uuid === this.$route.params.id);
                    if(findIndex !== -1) arr = [index, findIndex];
                });
                this.setSelectMenu(arr);
            }
        }
	}
</script>

<style scoped lang="less">
    .projectList {
        .search {
            margin-bottom: 10px;
            font-size: 14px;
        }
        .footer {
            margin-top: 10px;
            text-align: right;
        }
    }
</style>