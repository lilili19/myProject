<template>
	<footer>
        <div 
            v-for="(item,index) in routerList" 
            :key="index" 
            class="router"
            :class="{ select : index === routerIndex }"
            @click="$emit('routerLink', {index, name: item.name});$router.push({name:item.router})"
        >
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
        </div>
    </footer>
</template>
<script>
	export default {
        props: ['routerIndex'],
		data() {
			return {
				routerList: [
                    {
                        router: 'message',
                        name: '消息',
                        icon: 'el-icon-message'
                    },
                    {
                        router: 'userList',
                        name: '用户列表',
                        icon: 'el-icon-document'
                    },
                    {
                        router: 'my',
                        name: '我',
                        icon: 'el-icon-user'
                    }
                ]
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
	footer {
		width: 100%;
        height: 58px;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        border-top: 1px solid #ccc;
        .router {
            flex: 1;
            display: flex;
            align-content: center;
            justify-content: center;
            flex-wrap: wrap;
            text-align: center;
            i {
                width: 100%;
                font-size: 25px;
            }
            span {
                padding-top: 3px;
                width: 100%;
                font-size: 12px;
            }
        }
        .select {
            color: #218df7; 
        }
	}
</style>