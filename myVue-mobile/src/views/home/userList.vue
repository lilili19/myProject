<template>
	<div class="userList" v-loading="loading">
		<div class="title">
            <span>所有用户列表</span>
            <i class="el-icon-refresh-left" @click="getUserListAjax"></i>
        </div>
        <ul v-if="user.length">
            <li v-for="(item,index) in user" :key="index">
                <img :src="item.headerImg" alt="" @error="errorImg(index)">
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
                user: []
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
            errorImg(index) {
                this.user[index].headerImg = 'http://file.qqtouxiang.com/gexing/2019-02-19/smalld1ef0dacde0eefd3a9b46a2926b00a471550568587.jpg';
                this.$set(this.user, 0, this.user[0]);
                console.log(this.user)
            },
            async getUserListAjax() {
                const data = {};
                this.loading = true;
                await this.userList({
                    data,
                    callBack: (data) => {
                        this.user = data || [];
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
        padding-top: 40px;
        position: relative;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            // border-bottom: 1px solid #ddd;
            height: 40px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2),-1px -1px 5px rgba(0, 0, 0, 0.2);
        }
        ul {
            height: 100%;
            overflow-y: auto;
	        -webkit-overflow-scrolling: touch;
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
	}
</style>