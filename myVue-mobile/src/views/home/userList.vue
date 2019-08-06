<template>
	<div class="userList">
		
	</div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
	export default {
		components: {

		},
		data() {
			const { userName } = JSON.parse(sessionStorage.getItem('user')) || {};
			return {
				userName
			}
        },
        computed: {
			...mapGetters([
                'getUserList'
            ])
		},
		methods: {
			...mapActions([
				'setUserList'
			]),
		},
		mounted() {
			
		},
		watch: {
			
		}
	}
</script>

<style scoped lang="less">
	.userList {
		width: 100%;
		height: 100%;
	}
</style>