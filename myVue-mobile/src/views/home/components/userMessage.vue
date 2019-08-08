<template>
	<div class="userMessage">
		<div class="h">
            <img :src="userMessage.headerImg" alt="" :onerror="userMessage.headerImg=defaultImg">
        </div>
        <ul>
            <li>
                <span>昵称： </span>
                {{userMessage.nickName}}
            </li>
            <li>
                <span>用户名： </span> 
                {{userMessage.userName}}
            </li>
        </ul>
	</div>
</template>
<script>
    const { defaultImg } = require('../../../../config/index');
	export default {
        props: ['message'],
		data() {
			return {
                defaultImg,
                userMessage: {}
			}
		},
		methods: {
			
		},
		mounted() {
            this.userMessage = this.message || {};
		},
		watch: {
			
		}
	}
</script>

<style scoped lang="less">
	.userMessage {
		width: 100%;
        height: 100%;
        background-color: white;
        padding-top: 50px;
        .h {
            width: 100%;
            height: 100px;
            margin: 0 0 10px 0;
            display: flex;
            justify-content: center;
            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 10px;
            }
        }
        ul {
            li {
                padding: 10px;
                border-bottom: 1px solid #eee;
                display: flex;
                span {
                    width: 70px;
                    text-align: right;
                    margin-right: 5px;
                }
            }
        }
	}
</style>