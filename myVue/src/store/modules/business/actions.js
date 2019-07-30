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
    async addGrouping({commit}, {data, callBack}) { // 增加分组或者增加项目请求
        const url = '/menu/addGrouping';
        await http.post({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    async rename({commit}, {data, callBack}) { // 重命名分组或者增加项目请求
        const url = '/menu/rename';
        await http.post({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    async del({commit}, {data, callBack}) { // 删除分组或者增加项目请求
        const url = '/menu/del';
        await http.post({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    async projectList({commit}, {data, callBack, tableDatai}) { // 项目接口列表
        const url = '/project/list';
        await http.get({url, data}, {
            success: (data) => {
                callBack && callBack(data, tableDatai);
            }
        })
    },
    async addEdit({commit}, {data, callBack}) { // 新增或者修改项目接口
        const url = '/project/addEdit';
        await http.post({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    async del({commit}, {data, callBack}) { // 删除项目接口
        const url = '/project/del';
        await http.post({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        })
    },
    async request({commit}, {data, callBack}) { // 代理请求
        const url = '/request';
        await http.post({url, data}, {
            success: (data) => {
                callBack && callBack(data);
            }
        }, 'all')
    },
    setMenuList({ commit }, value) {
        commit('setMenuList', value);
    },
    setSelectMenu({ commit }, value) {
        commit('setSelectMenu', value);
    },
    setSearch({ commit }, value) {
        commit('setSearch', value);
    },
    setToDetailObj({ commit }, value) {
        commit('setToDetailObj', value);
    }
}