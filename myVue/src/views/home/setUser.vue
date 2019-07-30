<template>
	<div class="setUser" v-loading="loading">
        <el-col :span="24">
            <span style="color: #aaa">设置接口白名单（允许查看我的接口）：</span>
            <div class="search" style="padding: 20px 0;color: #aaa">
                状态： <el-select v-model="getSearch.state">
                        <el-option label="" value=""></el-option>
                        <el-option label="白名单" value="1"></el-option>
                        <el-option label="非白名单" value="0"></el-option>
                    </el-select>
                &nbsp;
                用户关键字：<el-input placeholder="请输入关键字" style="width: 200px;" v-model="getSearch.key"></el-input>
                <el-button @click="userList" type="primary">搜索</el-button>
            </div>
        
            <el-table
                :data="tableData"
                ref="table"
                border
                style="width: 100%"
            >
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column prop="index" label="排序" width="50"></el-table-column>
                <el-table-column prop="userName" label="用户名" width=""></el-table-column>
                <el-table-column prop="creatTime" label="创建时间" width=""></el-table-column>
                <el-table-column prop="state" label="状态" width="">
                    <template slot-scope="scope">
                        {{scope.row.state == 1 ? '白名单' : '非白名单'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        :type="scope.row.state == 0 ? 'primary' : ''"
                        @click="addWhiteList(scope.$index, scope.row)">{{scope.row.state == 1 ? '取消白名单' : '添加白名单'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer">
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
        </el-col>
    </div>
</template>

<script>
    import Header from '../../components/header'
    import { mapActions, mapGetters } from 'vuex'
	export default {
        components: {
			Header
		},
		data() {
            let i = 1;
			return {
                loading: false,
                getSearch: {
                    key: '',
                    state: ''
                },
                tableData: [],
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                userNames: []
			}
        },
        name: 'setUser',
		methods: {
            ...mapActions([
                'getUserList',
                'updateState'
			]),
            // 添加&&删除白名单
            async addWhiteList(index, row) {
                const { state, userName } = row;
                const data = {
                    currentUserName: userName,
                    state: state === 1 ? 0 : 1
                };
				this.loading = true;
				await this.updateState({
					data,
					callBack: (data) => {
                        this.$message.success(state === 1 ? '取消成功' : '添加成功');
                        row.state = state === 1 ? 0 : 1;
					}
				})
				this.loading = false;
            },
            // 请求用户列表
            async userList() {
                const { key, state } = this.getSearch;
				const data = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    key,
                    state
                };
				this.loading = true;
				await this.getUserList({
					data,
					callBack: (data) => {
                        const { count=0, list=[] } = data || {};
                        this.total = count;
                        this.tableData = list.map((e, index) => {
                            const { creatTime, userName, state } = e;
                            return {
                                index: index * this.pageIndex + 1,
                                creatTime, 
                                userName, 
                                state
                            }
                        })
                        
					}
				})
				this.loading = false;
            },
            handleSelectionChange(data) {
                this.userNames = data.map(e => e.userName);
            },
            currentPage(index) {
                this.pageIndex = index;
                this.userList();
            }
		},
		mounted() {
            this.userList();
        },
        watch: {
            
        }
	}
</script>

<style scoped lang="less">
    .setUser {
        .footer {
            margin-top: 10px;
            text-align: right;
        }
    }
</style>