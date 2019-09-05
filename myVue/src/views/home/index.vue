<template>
	<el-row class="container" v-loading='loading'>
		<Header @dialogShow='dialogShow' @setUser="setUser" />
		<el-col :span="24" class="main">
			<div class="nav">
				<Menu 
					:menuList = 'getMenuList'
					:getSelectMenu = 'getSelectMenu'
					@changeHidden = '(index) => { getMenuList[index].hidden = !getMenuList[index].hidden; }' 
					@showGroupPopup = 'showGroupPopup' 
					@routerView = 'routerView'
					@changeSelectMenu = '(arr) => { setSelectMenu(arr) }'
					@changeSetMenuList = '(arr) => { setMenuList(arr) }'
				/>
			</div>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
							<!-- <Content :name='selectName' /> -->
						</transition>
					</el-col>
				</div>
				<div v-if="!getSelectMenu.length && $route.name !== 'setUser'" style="font-size: 18px;">
					Welcome!
				</div>
			</section>
		</el-col>
		<el-dialog
			:title="obj.title"
			:visible="obj.model"
			width="350px"
			:before-close="()=>obj.model = false"
		>
			<p style="display: flex;align-items: center;" v-if="obj.type !== 4">
				<span>名称：</span>
				<el-input style="flex:1;margin-left: 5px;" placeholder="请输入名称" v-model="obj.data" autofocus v-if="obj.model"></el-input>
			</p>
			<p style="display: flex;align-items: center;" v-else>
				<span v-html="obj.delContent"></span>
			</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="obj.model = false">取 消</el-button>
				<el-button type="primary" @click="dialogTrue">确 定</el-button>
			</span>
		</el-dialog>
		<div class="diaPopup" v-if="diaPopup.isShowSelect" @click="diaPopup.isShowSelect = false" @contextmenu='(e) => e.preventDefault()'>
			<ul :style="{ top: diaPopup.Y + 'px', left: diaPopup.X + 'px' }" @click.stop>
				<li v-for="(item,index) in diaPopup.data" :key="index" @click="changeGopup(index)">{{item}}</li>
			</ul>
		</div>
	</el-row>
</template>

<script>
	import Menu from './components/menu'
	import Header from '../../components/header'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		components: {
			Menu,
			Header
		},
		data() {
			const { userName } = JSON.parse(sessionStorage.getItem('user')) || {};
			return {
				userName,
				loading: false,
				selectName: '',
				obj: {
					model: false,
					title: '',
					type: 1, // 1.新增组, 2. 新增项目, 3. 重命名组或者项目, 4. 删除组或者项目
					data: '', // input 绑定
					delContent: '' // 删除内容
				},
				// 菜单右键弹框
				diaPopup: {
					isShowSelect: false,
					selectIndex: [],
					X: 0,
					Y: 0,
					data: []
				}
			}
		},
		computed: {
			...mapGetters([
				'getMenuList',
				'getSelectMenu'
            ])
		},
		methods: {
			...mapActions([
				'setMenuList',
				'setSelectMenu',
				'getNavList',
				'addGrouping',
				'rename',
				'menuDel'
			]),
			// 出现弹出层
			dialogShow(title='', type=1, data='', delContent) {
				this.obj = {
					model: true,
					title,
					type,
					data,
					delContent
				}
			},
			// 确定
			dialogTrue() {
				const obj = this.getMenuList[this.diaPopup.selectIndex[0] || 0] || {};
				const index2 = this.diaPopup.selectIndex[1];
				switch(this.obj.type) {
					case 1:
						// 新增组
						if(!this.obj.data) return this.$message.error('请输入名称');
						this.addGroupingAjax();
					break;
					case 2:
						// 新增项目
						if(!this.obj.data) return this.$message.error('请输入名称');
						this.addGroupingAjax(obj.uid);
					break;
					case 3:
						// 重命名
						if(!this.obj.data) return this.$message.error('请输入名称');
						this.renameAjax(index2 || index2 === 0 ? obj.children[index2].id : obj.id, obj.uid, (obj.children[index2] || {}).uuid);
					break;
					case 4:
						// 删除
						const { id, uuid } = obj.children[index2] || {};
						this.delAjax(obj.uid, uuid);
					break;
				}
			},
			// 请求菜单栏
			async navList() {
				const { userName } = JSON.parse(sessionStorage.getItem('user')) || {};
				const data = {
					userName
				};
				this.loading = true;
				await this.getNavList({
					data,
					callBack: (data) => {
						data = (data || []).map(e => {
							const children = (e.children || []).map(e2 => {
								return {
									id: e2.id,
									title: e2.name,
									uuid: e2.uuid,
									userName: e2.userName
								}
							});
							return {
								id: e.id,
								title: e.name,
								uid: e.uid,
								userName: e.userName,
								hidden: true,
								children
							}
						})
						this.setMenuList(data);
					}
				})
				this.loading = false;
			},
			// 增加分组或者增加项目请求
			async addGroupingAjax(uid) {
				const data = {
					uid, // 如存在则为新增项目
					name: this.obj.data
				};
				this.loading = true;
				await this.addGrouping({
					data,
					callBack: (data) => {
						if(!uid) {
							const pushObj = {
								title: this.obj.data,
								uid: data,
								userName: this.userName,
								hidden: true,
								children: []
							}
							const index = this.getMenuList.findIndex(e => e.userName !== this.userName);
							if(index === -1) this.getMenuList.push(pushObj); // 找不到 则在 最后插入
							else this.getMenuList.splice(index, 0, pushObj);
						} else {
							this.getMenuList[this.diaPopup.selectIndex[0]].children.push({
								title: this.obj.data,
								userName: this.userName,
								uuid: data
							})
						}
						this.obj.model = false;
						this.$message.success('新增成功');
					}
				})
				this.loading = false;
			},
			// 重命名分组或者项目请求
			async renameAjax(id, uid, uuid) {
				const data = {
					id,
					uid,
					uuid, // 不存在则为组重命名
					name: this.obj.data
				};
				this.loading = true;
				await this.rename({
					data,
					callBack: (data) => {
						if(!uuid) this.getMenuList[this.diaPopup.selectIndex[0]].title = this.obj.data;
						else this.getMenuList[this.diaPopup.selectIndex[0]].children[this.diaPopup.selectIndex[1]].title = this.obj.data;

						this.obj.model = false;
						// this.$message.success('修改成功');
					}
				})
				this.loading = false;
			},
			// 删除分组或者增加项目请求
			async delAjax(uid, uuid) {
				const data = {
					uid,
					uuid, // 不存在则为组删除
				};
				this.loading = true;
				await this.menuDel({
					data,
					callBack: (data) => {
						if(!uuid) this.getMenuList.splice(this.diaPopup.selectIndex[0], 1);
						else this.getMenuList[this.diaPopup.selectIndex[0]].children.splice(this.diaPopup.selectIndex[1], 1);

						this.obj.model = false;
						return this.$message.success('删除成功');
					}
				})
				this.loading = false;
			},
			// 菜单右键弹出
			showGroupPopup([index, index2], { X, Y }) {
				this.diaPopup = {
					isShowSelect: true,
					selectIndex: [index, index2],
					X,
					Y,
					data: index2 || index2 === 0 ? ['重命名', '删除'] : ['重命名', '增加项目', '删除该组']
				}
			},
			// 修改组、项 状态
			changeGopup(index) {
				this.diaPopup.isShowSelect = false;
				const obj = this.getMenuList[this.diaPopup.selectIndex[0]];
				const index2 = this.diaPopup.selectIndex[1];
				switch(index) {
					case 0:
						this.dialogShow('重命名', 3, index2 || index2 === 0 ? obj.children[index2].title : obj.title); // 重命名
					break;
					case 1:
						if(index2 || index2 === 0) { // 删除项目
							const { title } = obj.children[index2];
							this.dialogShow('删除项目', 4, '', `确定删除项目<span style="color: red">${title}</span>?`);
						}
						else this.dialogShow('新增项目', 2, ''); // 新增项目
					break;
					case 2:
						this.dialogShow('删除项目', 4, '', `确定删除<span style="color: red">${obj.title}</span>整组?`); // 删除组
					break;
				}
			},
			// 渲染内容
			routerView(index, index2) {
				const { uuid, title } = this.getMenuList[index].children[index2];
				this.selectName = title;
				this.$router.push({
					name: 'projectList',
					params: {
                        id: uuid
                    }
				});
			},
			// 设置
			setUser() {
				// this.setSelectMenu([]);
				this.$router.push({
					name: 'setUser'
				});
			},
			//退出登录
			logout() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {
				});
			}
		},
		mounted() {
			this.navList();
		},
		watch: {
			
		}
	}
</script>

<style scoped lang="less">
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			.nav {
				width: 230px;
			}
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}
				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
		.diaPopup {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .2);
			ul {
				background-color: white;
				width: 240px;
				position: absolute;
				border-radius: 3px;
				overflow: hidden;
				li {
					padding: 10px;
					text-align: center;
					cursor: pointer;
				}
				li:hover {
					background-color: #eee;
				}
			}
		}
	}
</style>