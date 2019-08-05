<template>
	<div class="header">
		<div class="left"><i class="el-icon-arrow-left"></i></div>
		<div class="cen">{{title}}</div>
		<div class="left"></div>
	</div>
</template>
<script>
	export default {
        props: ['title'],
		data() {
			return {
				
			}
		},
		computed: {
			
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
	.header {
		width: 100%;
		height: 46px;
		background-color: #218df7;
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        color: white;
        .left {
            font-size: 25px;
            width: 40px;
            text-align: center;
        }
        .cen {
            font-size: 18px;
            flex: 1;
            text-align: center;
        }
	}
</style>