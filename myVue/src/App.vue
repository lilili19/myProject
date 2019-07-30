<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        watch: {
            $route(to, from) {
                const { token } = JSON.parse(sessionStorage.getItem('user')) || {};
                if(!token && to.path !== '/login') {
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style>
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
