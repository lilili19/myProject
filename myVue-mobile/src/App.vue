<template>
    <div id="app" :style="{ paddingBottom : isIphoneX() ? '34px' : '' }">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        methods: {
            toLogin() {
                const { token } = JSON.parse(sessionStorage.getItem('user')) || {};
                if(!token && this.$route.path !== '/login') {
                    this.$router.push('/login');
                }
            },
            isIphoneX() {
                if(/iphone/gi.test(window.navigator.userAgent)){
                    /* iPhone X、iPhone XS */
                    var x=(window.screen.width === 375 && window.screen.height === 812);
                    /* iPhone XS Max */
                    var xsMax=(window.screen.width === 414 && window.screen.height === 896);
                    /* iPhone XR */
                    var xR=(window.screen.width === 414 && window.screen.height === 896);
                    if(x || xsMax || xR){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false
                }
            }
        },
        created() {
            this.toLogin();
            if(this.isIphoneX()) {
                sessionStorage.setItem('isIphoneX', true);
            } else {
                sessionStorage.removeItem('isIphoneX');
            }
        },
        watch: {
            $route(to, from) {
                this.toLogin();
            }
        }
    }
</script>

<style>
    html, body {
        height: 100%;
    }
    #app {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ul,li {
        list-style: none;
    }
    .el-message-box {
        width: 80%;
    }
</style>
