<template>
	<div class="my">
		<UserMessage :message="user" />
		<p class="outLogin" @click="outLogin">退出登陆</p>
	</div>
</template>
<script>
	import UserMessage from './components/userMessage'
	export default {
		components: {
			UserMessage
		},
		data() {
			const user = JSON.parse(sessionStorage.getItem('user')) || {};
			return {
				user
			}
		},
		methods: {
			outLogin() {
				this.$confirm('确定退出当前账号?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					window.location.href = "#/login"
					sessionStorage.removeItem('user');
				}).catch(() => {
					      
				});
			}
		},
		mounted() {
			
		},
		watch: {
			
		}
	}
</script>

<style scoped lang="less">
	.my {
		width: 100%;
		height: 100%;
		position: relative;
		.outLogin {
			width: 100%;
			padding: 10px;
			text-align: center;
			position: absolute;
			left: 0;
			bottom: 0;
			border-top: 1px solid #ddd;
			color: #ec3838;
		}
	}
</style>