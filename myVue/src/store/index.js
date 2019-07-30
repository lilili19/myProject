import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import login from './modules/login'
import business from './modules/business'
export default new Vuex.Store({
    modules:{
        login,
        business
    }
});