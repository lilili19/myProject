<template>
	<div class="userList" v-loading="loading">
		<div class="title">
            <span>所有用户列表</span>
            <i class="el-icon-refresh-left" @click="getUserListAjax"></i>
        </div>
        <ul>
            <li v-for="(item,index) in user" :key="index" @click="showUserMessage(item)">
                <img :src="item.headerImg" alt="" :onerror="item.headerImg=defaultImg">
                <span>{{item.nickName}}</span>
            </li>
        </ul>
        <div class="message" v-if="userMessage">
            <Header :leftClick="back" :title="(userMessage||{}).nickName" />
            <UserMessage :message="userMessage||{}" />
        </div>
	</div>
</template>
<script>
    import Header from '../../components/header'
    import UserMessage from './components/userMessage'
    import { mapActions, mapGetters } from 'vuex'
    const { defaultImg } = require('../../../config/index');
	export default {
		components: {
            Header,
            UserMessage
		},
		data() {
			const { userName } = JSON.parse(sessionStorage.getItem('user')) || {};
			return {
                defaultImg,
                userName,
                loading: false,
                user: [],
                userMessage: ''
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
                        this.user = data || [];
                        this.setUserList(this.user);
                    }
                })
                this.loading = false;
            },
            showUserMessage(item) {
                this.userMessage = item;
                window.history.pushState({}, null, "");
                window.addEventListener("popstate", this.back, false); 
            },
            back() {
                this.userMessage = '';
                window.removeEventListener("popstate", this.back, false); 
            }
		},
		mounted() {
			if(this.getUserList.length === 0) {
                this.getUserListAjax();
            } else this.user = this.getUserList;
		},
		watch: {
			
        },
        beforeDestroy() {
            window.removeEventListener("popstate", this.back, false);
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
        .message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding-top: 46px;
            z-index: 100000;
        }
	}
</style>