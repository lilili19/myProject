const express = require('express');
const operationMySql = require('../sql/operationMySql');
const { timeConversion } = require('../commonMethod');
const { createToken, checkToken } = require('../token/token');
const { mobileSqlName } = require('../config');
let router = express.Router();

const cheakUser = ({ userName, password }, res) => {
    let state = '';
    if(!userName) state = '用户名不能为空';
    else if(!password) state = '密码不能为空';
    if(state) {
        const resObj = {
            data: null,
            msg: state,
            code: 400
        }
        return res.send(JSON.stringify(resObj));
    }
    return false;
}

// 登录
router.get('/login', async (req, res) => {
    const { userName, password } = req.query;
    // 检测用户名、密码不能为空
    if(cheakUser({ userName, password }, res)) return;
    /*
        打开连接数据库表
    */
    const mySql = new operationMySql(); // 数据库实例化
    mySql.createConnection(mobileSqlName); // 打开并连接数据库
    mySql.setMap(`${mobileSqlName}.user`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    let state = '', queryData = null;
    /*
        查询用户名是否存在
    */
    await mySql.query({
        userName
    }, (type, data) => {
        if(!type) {
            state = '查询失败';
        }
        if(!data || data.length === 0) {
            state = '用户名不存在';
        }
    });
    /*
        登录
    */
    if(!state) {
        await mySql.query({
            userName,
            password
        }, (type, data) => {
            if(!type) state = '查询失败';
            if(data && data.length === 0) state = '密码不正确';
            if(type && data.length !== 0) {
                data[0].creatTime = timeConversion(data[0].creatTime, 'YY-MM-DD HH:MM:SS');
                const { password, ...resData } = data[0];
                queryData = resData;
            }
        })
    }
    /*
        生成token
    */
    if(!state) {
        const getToken = createToken(userName);
        queryData.token = getToken;
    }
    if(!state) { // 登录成功后记录
        const loginIp = req.header('x-forwarded-for') || req.connection.remoteAddress;
        mySql.setMap(`${mobileSqlName}.loginaddress`); // 设置数据库将要操作的表
        await mySql.add({
            userName,
            loginIp,
            loginTime: timeConversion(new Date(), 'YY-MM-DD HH:MM:SS')
        }, (type, data) => {
            // if(!type) console.log('记录失败');
            // console.log('记录成功');
        });
    }
    mySql.end();
    const resObj = {
        data: queryData,
        msg: state || '登录成功',
        code: state ? 400 : 200
    }
    // res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

// 注册
router.get('/register', async (req, res) => {
    const userCreatIp = req.header('x-forwarded-for') || req.connection.remoteAddress;
    const { userName, password, nickName } = req.query;
    if(!nickName) {
        const resObj = {
            data: null,
            msg: '昵称不能为空',
            code: 400
        }
        return res.send(JSON.stringify(resObj));
    }
    // 检测用户名、密码不能为空
    if(cheakUser({ userName, password }, res)) return;
    /*
        打开连接数据库表
    */
    const mySql = new operationMySql(); // 数据库实例化
    mySql.createConnection(mobileSqlName); // 打开并连接数据库
    mySql.setMap(`${mobileSqlName}.user`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    let state = '';
    // 查询用户名是否存在
    await mySql.query({
        userName
    }, (type, data) => {
        if(!type) {
            state = '查询用户名失败';
        }
        if(data && data.length !== 0) {
            state = '用户名已存在';
        }
    });
    // 注册
    if(!state) {
        await mySql.add({
            nickName,
            userName,
            password,
            userCreatIp,
            creatTime: timeConversion(new Date(), 'YY-MM-DD HH:MM:SS')
        }, (type, data) => {
            if(!type) state = '注册失败';
        })
    }
    mySql.end();
    const resObj = {
        data: null,
        msg: state || '注册成功',
        code: state ? 400 : 200
    }
    // res.writeHead(200, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

// 获取用户列表
router.get('/getUserList', async (req, res) => {
    const { token } = req.headers;
    const { cheak, code, msg, userName } = checkToken(token);
    if(!cheak) {
        return res.send(JSON.stringify({
            data: null,
            msg,
            code
        }));
    }
    /*
        打开连接数据库表
    */
    const mySql = new operationMySql(); // 数据库实例化
    mySql.createConnection(mobileSqlName); // 打开并连接数据库
    mySql.setMap(`${mobileSqlName}.user`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    let state = null, queryData = [];
    await mySql.query({}, (type, data) => {
        if(!type) {
            return state = '查询失败';
        }
        queryData = data.filter(e => e.userName !== userName).map(e => {
            const { password , userCreatIp, creatTime, ...data } = e;
            return data;
        });
    });
    mySql.end();
    const resObj = {
        data: queryData,
        msg: state || '查询成功',
        code: state ? 400 : 200
    }
    res.send(JSON.stringify(resObj));
})



//导出该路由
module.exports = router;