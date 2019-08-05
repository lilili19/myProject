<template>
    <div id="app">
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
            }
        },
        created() {
            this.toLogin();
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
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ul,li {
        list-style: none;
    }
</style>
