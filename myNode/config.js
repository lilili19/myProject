
const path = 'dev';
// const path = '';

module.exports = {
    sqlName: 'user', // 数据库表1
    sqlName2: 'business', // 数据库表2
    host: path === 'dev' ? '/api' : '', // 接口
    mySqlPassword: '123456' // mySql 密码
}