<template>
	<div class="userList" v-loading="loading">
		<div class="title">
            <span>所有用户列表</span>
            <i class="el-icon-refresh-left" @click="getUserListAjax"></i>
        </div>
        <ul>
            <li v-for="(item,index) in user" :key="index">
                <img :src="headerImg" alt="">
                <span>{{item.userName}}</span>
            </li>
        </ul>
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
                userName,
                loading: false,
                user: [
                    {
                        userName: '1',
                        headerImg: ''
                    }
                ]
			}
        },
        computed: {
			...mapGetters([
                'getUserList'
            ])
		},
		methods: {
			...mapActions([
                'setUserList',
                'userList'
            ]),
            async getUserListAjax() {
                const data = {};
                this.loading = true;
                await this.userList({
                    data,
                    callBack: (data) => {
                        debugger;
                    }
                })
                this.loading = false;
            }
		},
		mounted() {
			if(this.getUserList.length === 0) {
                this.getUserListAjax();
            } else this.user = this.getUserList;
		},
		watch: {
			
		}
	}
</script>

<style scoped lang="less">
	.userList {
		width: 100%;
        height: 100%;
        overflow-y: auto;
	    -webkit-overflow-scrolling: touch;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            border-bottom: 1px solid #ddd;
            height: 40px;
        }
        li {
            display: flex;
            align-items: center;
            height: 50px;
            border-bottom: 1px solid #eee;
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 10px;
            }
        }
	}
</style>