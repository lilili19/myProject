
// const path = 'dev';
const path = '';

module.exports = {
    sqlName: 'user', // 数据库表1
    sqlName2: 'business', // 数据库表2
    mobileSqlName: 'usermobile',
    mobileSqlName2: 'massagemobile',
    host: '/api', // 接口
    mySqlPassword: path === 'dev' ? '123456': 'chero@123' // mySql 密码
}