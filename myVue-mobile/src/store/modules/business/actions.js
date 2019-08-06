import { http } from '../../ajax'

export default {
    async getNavList({commit}, {data, callBack}) { // 请求菜单列表
        const url = '/menu/navList';
        await http.get({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    setUserList({ commit }, value) {
        commit('setUserList', value);
    }
}