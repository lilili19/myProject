
const express = require('express');
const operationMySql = require('../sql/operationMySql');
const { timeConversion } = require('../commonMethod');
const { createToken, checkToken } = require('../token/token');
const { sqlName } = require('../config');
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
    const loginIp = req.headers.ip;
    if(!loginIp) {
        return res.send('<h1>404</h1>');
    }
    const { userName, password } = req.query;
    // 检测用户名、密码不能为空
    if(cheakUser({ userName, password }, res)) return;
    /*
        打开连接数据库表
    */
   const mySql = new operationMySql(); // 数据库实例化
   mySql.createConnection(sqlName); // 打开并连接数据库
   mySql.setMap(`${sqlName}.user`); // 设置数据库将要操作的表
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
        mySql.setMap(`${sqlName}.loginaddress`); // 设置数据库将要操作的表
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
    const userCreatIp = req.headers.ip;
    if(!userCreatIp) {
        return res.send('<h1>404</h1>');
    }
    const { userName, password } = req.query;
    // 检测用户名、密码不能为空
    if(cheakUser({ userName, password }, res)) return;
    /*
        打开连接数据库表
    */
    const mySql = new operationMySql(); // 数据库实例化
    mySql.createConnection(sqlName); // 打开并连接数据库
    mySql.setMap(`${sqlName}.user`); // 设置数据库将要操作的表
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
            userName,
            password,
            userCreatIp,
            creatTime: timeConversion(new Date(), 'YY-MM-DD HH:MM:SS')
        }, (type, data) => {
            if(!type) state = '新增失败';
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
// 修改密码
router.post('/updatePassword', async (req, res) => {
    const userCreatIp = req.headers.ip;
    if(!userCreatIp) {
        return res.send('<h1>404</h1>');
    }
    const { userName, password } = req.body;
    // 检测用户名、密码不能为空
    if(cheakUser({ userName, password }, res)) return;
    /*
        打开连接数据库表
    */
   const mySql = new operationMySql(); // 数据库实例化
   mySql.createConnection(sqlName); // 打开并连接数据库
   mySql.setMap(`${sqlName}.user`); // 设置数据库将要操作的表
   /*
       打开连接数据库表end
   */
    let state = '', queryData = null;
    await mySql.query({
        userName
    }, (type, data) => {
        if(!type) {
            state = '查询用户名失败';
        }
        if(!data || data.length === 0) {
            state = '用户名不存在';
        }
        queryData = data;
    });
    if(!state) {
        await mySql.update({
            userName,
            password
        }, (type, data) => {
            if(!type) state = '修改失败';
        }, {
            id: queryData[0].id
        })
    }
    mySql.end();
    const resObj = {
        data: null,
        msg: state || '修改成功',
        code: state ? 400 : 200
    }
    // res.writeHead(200, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

// 获取用户列表
router.get('/getUserList', async (req, res) => {
    const loginIp = req.headers.ip;
    if(!loginIp) {
        return res.send('<h1>404</h1>');
    }
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
   mySql.createConnection(sqlName); // 打开并连接数据库
   mySql.setMap(`${sqlName}.user`); // 设置数据库将要操作的表
   /*
       打开连接数据库表end
   */
    let resState = '', queryData = [];
    const { key, state, pageIndex, pageSize  } = req.query;
    await mySql.query({}, (type, data) => {
        if(!type) resState = '查询失败';
        let [list, count] = data;
        list = list.filter(e => e.userName !== userName);
        if(state == 1 || state == 0) { // 白名单 || 非白名单
            const currentUserName = list.find(e => e.userName = userName); // 当前用户
            const arr = (currentUserName.whiteList || '').split(','); // 当前用户 的 白名单数组
            const whiteList = list.filter(e => { // 白名单 
                return arr.includes(e.userName);
            })
            const noWhiteList = list.filter(e => { // 非白名单
                return !arr.includes(e.userName);
            });
            list = state == 1  ? whiteList : noWhiteList;
        }
        console.log(list);
        queryData = {
            count: count[0]['count(*)'],
            list: list.map(e => { e.creatTime = timeConversion(e.creatTime, 'YY-MM-DD HH:MM:SS'); return e })
        }
        queryData.list = queryData.list.map(e => {
            const { password, ...data } = e;
            return data;
        });
    }, {
        pageIndex, pageSize
    } , key ? {
        userName: key
    } : null)
    mySql.end();
    const resObj = {
        data: queryData,
        msg: resState || '查询成功',
        code: resState ? 400 : 200
    }
    // res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

//导出该路由
module.exports = router;