<template>
	<div class="chat">
		<div class="top">
			<div>
				<ul ref="ul">
					<li v-for="(item,index) in messageList" :key="index">
						<template v-if="item.type == 1"> 
							<img :src="item.headImg" alt="" :onerror="item.headImg=defaultImg">
							<div>
								<p class="name">{{item.userName}}({{item.createTime}})</p>
								<div class="content">
									<span>{{item.msg}}</span>
									<var></var>
								</div>
							</div>
						</template>
						<template v-if="item.type == 2">
							<div>
								<p class="name" style="text-align: right">{{item.userName}}({{item.createTime}})</p>
								<div class="content content2">
									<span>{{item.msg}}</span>
									<var></var>	
								</div>
							</div>
							<img :src="item.headImg" alt="" :onerror="item.headImg=defaultImg" style="margin: 0px 0px 0 10px;">
						</template>
					</li>
				</ul>
			</div>
		</div>
		<div class="bottom" :style="{ bottom: isIphoneX ? '34px' : '' }">
			<form>
				<el-input
					placeholder="请输入内容"
					v-model="data"
				>
				</el-input>
				<el-button :type="data ? 'primary' : ''" @click="send" @blur="blur">发送</el-button>
			</form>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex'
	const { defaultImg } = require('../../../config/index');
	export default {
		components: {
			
		},
		data() {
			const { userName } = JSON.parse(sessionStorage.getItem('user')) || {};
			const isIphoneX = sessionStorage.getItem('isIphoneX');
			return {
				defaultImg,
				userName,
				isIphoneX,
				loading: false,
				data: '',
				messageList: [
					{
						type: 1,
						msg: '句话我说的第一句话我说的第一句话句句话我说的第一句话句话我说的第一句话我说的第一句话',
						userName: '我',
						createTime: '2019-8-5 16:13',
						headImg: ''
					},
					{
						type: 2,
						msg: '句话我说的第一句话我说的第一句话',
						userName: '我',
						createTime: '2019-8-5 16:13',
						headImg: ''
					},
					{
						type: 1,
						msg: '句话我说的第一句话我说的第一句话句话我说的第一句话句话我说的第一句话我说的第一句话',
						userName: '我',
						createTime: '2019-8-5 16:13',
						headImg: ''
					},
					{
						type: 2,
						msg: '句话我说的第一句话我说的第一句话',
						userName: '我',
						createTime: '2019-8-5 16:13',
						headImg: ''
					},
					{
						type: 2,
						msg: '句话我说的第一句话我说的第一句话',
						userName: '我',
						createTime: '2019-8-5 16:13',
						headImg: ''
					},
					{
						type: 2,
						msg: '句话我说的第一句话我说的第一句话',
						userName: '我',
						createTime: '2019-8-5 16:13',
						headImg: ''
					},
					{
						type: 2,
						msg: '句话我说的第一句话我说的第一句话',
						userName: '我',
						createTime: '2019-8-5 16:13',
						headImg: ''
					}
				]
			}
		},
		computed: {
			...mapGetters([
				
            ])
		},
		methods: {
			...mapActions([
				
			]),
			scrollTop() {
				const lis = this.$refs.ul.children;
				let l = 0;
				for(let i = 0; i < lis.length; i++) {
					l += lis[i].offsetHeight;
				}
				this.$refs.ul.scrollTop = l - 400;
			},
			send() {
				if(!this.data) return;
				alert(this.data);
			},
			blur() {
				window.scrollTop(0, document.documentElement.scrollTop);
			}
		},
		mounted() {
			this.scrollTop();
		},
		watch: {
			
		}
	}
</script>

<style scoped lang="less">
    .chat {
		width: 100%;
		height: 100%;
		padding: 46px 0 40px 0;
		overflow: hidden;
		.top {
			width: 100%;
			height: 100%;
			background-color: #f1f1f1;
			&>div {
				width: 100%;
				height: 100%;
				position: relative;
				ul {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					max-height: 100%;
					overflow-y: auto;
					-webkit-overflow-scrolling: touch;
					background-color: #f1f1f1;
					li {
						width: 100%;
						// height: 80px;
						display: flex;
						// border-top: 1px solid #ddd;
						padding: 20px;
						img {
							margin: 0px 10px 0 0;
							width: 30px;
							height: 30px;
							border-radius: 50%;
							overflow: hidden;
						}
						&>div {
							flex: 1;
							.name {
								font-size: 12px;
								color: #aaa;
							}
							.content {
								padding-top: 5px;
								display: flex;
								justify-content: flex-start;
								position: relative;
								span {
									display: inline-block;
									padding: 8px 10px;
									border-radius: 4px;
									background-color: white;
									line-height: 1.414;
								}
								var {
									position: absolute;
									width: 0;
									height: 0;
									border: 5px solid;
									border-color: transparent white transparent transparent;
									top: 10px;
									left: -10px;
								}
							}
							.content2 {
								justify-content: flex-end;
								var {
									border-color: transparent transparent transparent white;
									right: -10px;
									left: inherit;
								}
							}
						}					
					}
				}
			}
		}
		.bottom {
			width: 100%;
			height: 39px;
			position: fixed;
			bottom: 0;
			left: 0;
			form {
				display: flex;
			}
		}
	}
</style>