
import getters from './getters' // 导入响应的模块，*相当于引入了这个组件下所有导出的事例
import actions from './actions'
import mutations from './mutations'
 
const state = {
    menuList: [], // 菜单列表
    selectMenu: [], //   当前选择菜单的脚标
    search: { // 记录搜索条件状态
        date: [],
        method: '',
        key: ''
    },
    // 记录当前进入详情的一组数据
    toDetailObj: {}
}
 
// 注册上面引入的各大模块
const store = {
    state,    // 共同维护的一个状态，state里面可以是很多个全局状态
    getters,  // 获取数据并渲染
    actions,  // 数据的异步操作
    mutations  // 处理数据的唯一途径，state的改变或赋值只能在这里
}
 
export default store  // 导出store并在 main.js中引用注册。