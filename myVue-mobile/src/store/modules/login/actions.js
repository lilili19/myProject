import { http } from '../../ajax'

export default {
    async userLogin({commit}, {data, callBack}) {
        const url = '/mobile/user/login';
        await http.get({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    async userRegister({commit}, {data, callBack}) {
        const url = '/mobile/user/register';
        await http.get({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    async userUpdatePassword({commit}, {data, callBack}) {
        const url = '/mobile/user/updatePassword';
        await http.post({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    async getUserList({commit}, {data, callBack}) {
        const url = '/mobile/user/getUserList';
        await http.get({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    // changeBg({ commit }, value) {
    //     commit('changeBg', value);
    // }
}