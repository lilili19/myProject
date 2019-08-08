<template>
	<div class="message" v-loading="loading">
        <ul>
            <li v-for="(item,index) in user" :key="index" @click="showUserMessage(item)">
                <img :src="item.headerImg" alt="" :onerror="item.headerImg=defaultImg">
                <span>{{item.nickName}}</span>
            </li>
        </ul>
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
            
		},
		mounted() {
			
		},
		watch: {
			
        }
	}
</script>

<style scoped lang="less">
	.message {
		width: 100%;
        height: 100%;
        padding-top: 40px;
        position: relative;
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