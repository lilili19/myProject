<template>
	<div class="my">
		
	</div>
</template>
<script>
	export default {
		components: {

		},
		data() {
			const { userName } = JSON.parse(sessionStorage.getItem('user')) || {};
			return {
				userName
			}
		},
		methods: {
			
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
	}
</style>