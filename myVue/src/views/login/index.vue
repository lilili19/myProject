<template>
    <div class="login" v-loading="loading">
        <div class="login_form">
            <el-input type="text" class="qxs-ic_user" placeholder="用户名" v-model="userName" />
            <el-input type="text" class="qxs-ic_password" placeholder="密码" v-model="password" @keyup.enter.native="keydown" />
            <el-button class="login_btn" @click="login" type="primary">登录</el-button>
            <div style="margin-top: 10px">
                <span style="color: #A9A9AB;cursor: pointer;" @click="register">注册账号</span>
                <!-- <span style="float: right;color: #A9A9AB;cursor: pointer;" @click="updatePassword">修改密码</span> -->
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        components: {
            
        },
        name: 'login',
        data() {
            return {
                userName: '',
                password: '',
                loading: false
            }
        },
        mounted() {
            
        },
        computed: {
            ...mapGetters([
                
            ])
        },
        methods: {
            ...mapActions([
                'userLogin',
                'userRegister',
                'userUpdatePassword'
            ]),
            async login() {
                if(!this.userName) return this.$message.error('用户名不能为空');
                if(!this.password) return this.$message.error('密码不能为空');
                const data = {
                    userName: this.userName,
                    password: this.password
                }
                this.loading = true;
                await this.userLogin({
                    data,
                    callBack: (data) => {
                        sessionStorage.setItem('user', JSON.stringify(data));
                        this.$router.push('/');
                    }
                })
                this.loading = false;
            },
            async register() {
                if(!this.userName) return this.$message.error('用户名不能为空');
                if(!this.password) return this.$message.error('密码不能为空');
                const data = {
                    userName: this.userName,
                    password: this.password
                }
                this.loading = true;
                await this.userRegister({
                    data,
                    callBack: (data) => {
                        this.$message.success('注册成功');
                    }
                })
                this.loading = false;
            },
            async updatePassword() {
                if(!this.userName) return this.$message.error('用户名不能为空');
                if(!this.password) return this.$message.error('密码不能为空');
                const data = {
                    userName: this.userName,
                    password: this.password
                }
                this.loading = true;
                await this.userUpdatePassword({
                    data,
                    callBack: (data) => {
                        this.$message.success('修改成功');
                    }
                })
                this.loading = false;
            },
            keydown() {
                const e = window.event || arguments.callee.caller.arguments[0];
                if(e.keyCode == 13) {
                    this.login();
                }
            }
        },
        watch: {
            
        }
    }
</script>

<style lang='less' scoped>
    .login {
        width: 100%;
        height: 100%;
    }
    .login_form {
        width: 300px;
        margin: 0 auto;
        padding-top: 200px;
        // padding-left: 10%;
        // padding-right: 10%;
    }
    .qxs-ic_user {
        background-size: 13px 15px;
        background-position: 3%;
        margin-bottom: 10px;
    }
    .qxs-ic_password {
        background-size: 13px 15px;
        background-position: 3%;
        margin-bottom: 20px;
    }
    .login_logo {
        height: 100%;
    }
    .login_btn {
        width: 100%;
        font-size: 16px;
        background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */
        filter: brightness(1.4);
    }
</style>