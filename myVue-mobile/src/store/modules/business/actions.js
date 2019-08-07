import { http } from '../../ajax'

export default {
    async userList({commit}, {data, callBack}) { // 请求菜单列表
        const url = '/mobile/user/getUserList';
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