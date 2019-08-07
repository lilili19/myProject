<template>
	<div class="home">
		<Header :title="title" leftHidden='1' />
		<router-view/>
		<Footer :routerIndex='routerIndex' @routerLink="({index,name})=>{routerIndex=index;title=name}" />
	</div>
</template>
<script>
	import Header from '../../components/header'
	import Footer from '../../components/footer'
	export default {
		components: {
			Header,
			Footer
		},
		data() {
			const { userName } = JSON.parse(sessionStorage.getItem('user')) || {};
			return {
				routerIndex: 0,
				title: '消息',
				userName
			}
		},
		methods: {
			
		},
		mounted() {
			const { name } = this.$route;
			switch(name) {
				case 'message': 
					this.routerIndex = 0;
					this.title = '消息';
				break;
				case 'userList': 
					this.routerIndex = 1;
					this.title = '用户列表';
				break;
				case 'my': 
					this.routerIndex = 2;
					this.title = '我';
				break;
			}
		},
		watch: {
			
		}
	}
</script>

<style scoped lang="less">
	.home {
		width: 100%;
		height: 100%;
		padding: 46px 0 58px 0;
	}
</style>