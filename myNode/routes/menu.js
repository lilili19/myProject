
const express = require('express');
const operationMySql = require('../sql/operationMySql');
// const { timeConversion } = require('../commonMethod');
const { checkToken } = require('../token/token');
const { sqlName2 } = require('../config');
let router = express.Router();

// 生成随机数
const mathRandom = () => {
    let arr = '';
    for(let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * 10);
        arr += random;
    }
    return arr;
}
// 获取菜单列表
router.get('/navList', async (req, res) => {
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
    mySql.createConnection(sqlName2); // 打开并连接数据库
    mySql.setMap(`${sqlName2}.menu`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    let state = null, queryData = [];
    await mySql.query({
        userName
    }, (type, data) => {
        if(!type) {
            return state = '查询失败';
        }
        queryData = data;
        const uidArr = queryData.filter(e => !e.uuid).sort((a, b) => {
            return a.id - b.id;
        });
        const uuidArr = queryData.filter(e => e.uuid).sort((a, b) => {
            return a.id - b.id;
        });
        queryData = uuidArr.reduce(function(pre, cur) {
            const index = pre.findIndex(e => e.uid === cur.uid);
            const children = pre[index].children || [];
            children.push(cur);
            pre[index].children = children;
            return pre;
        }, uidArr);
    });
    mySql.end();
    const resObj = {
        data: queryData,
        msg: state || '查询成功',
        code: state ? 400 : 200
    }
    // res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

// 增加分组或项目
router.post('/addGrouping', async (req, res) => {
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
    mySql.createConnection(sqlName2); // 打开并连接数据库
    mySql.setMap(`${sqlName2}.menu`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    let state = null, queryData = [], id = null;
    await mySql.query({
        userName
    }, (type, data) => {
        if(!type) {
            return state = '查询失败';
        }
        queryData = data;
    });
    // 查询成功后寻找是否存在name
    const { name, uid } = req.body;
    let is = null;
    if(uid) is = queryData.find(e => e.uid === uid && e.uuid && e.name === name);// 新增项目
    else is = queryData.find(e => !e.uuid && e.name === name); // 新增组
    if(is) {
        queryData = null,
        state = uid ? '项目名已存在' : '组名已存在';
    } else {
        const uidRandom = mathRandom() + new Date().getTime();
        let uuidRandom = null;
        const obj = {
            userName,
            uid: uid || uidRandom,
            name
        }
        if(uid) {
            uuidRandom = mathRandom() + new Date().getTime();
            obj.uuid = uuidRandom;
        }
        await mySql.add(obj, (type, data) => {
            if(!type) {
                return state = '添加失败';
            }
            id = uid ? uuidRandom : uidRandom; // 将新增的id记录 返回给前端
        });
    }
    mySql.end();
    const resObj = {
        data: id,
        msg: state || '新增成功',
        code: state ? 400 : 200
    }
    // res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

// 重命名组或者项目
router.post('/rename', async (req, res) => {
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
    mySql.createConnection(sqlName2); // 打开并连接数据库
    mySql.setMap(`${sqlName2}.menu`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    let state = null, queryData = [];
    const { name, id, uid, uuid } = req.body;
    let par = {
        userName
    };
    await mySql.query(par, (type, data) => {
        if(!type) {
            return state = '更改失败';
        }
        queryData = data;
    });
    if(!state) {
        let filter = [];
        if(uuid) filter = queryData.filter(e => e.uid === uid && e.uuid); 
        else filter = queryData.filter(e => !e.uuid);
        const isRepeat = filter.find(e => e.name === name);
        if(isRepeat) {
            state = '名称已存在';
        } else { // 判断名称没重复后
            const obj = {
                name
            }
            await mySql.update(obj, (type, data) => {
                if(!type) {
                    return state = '更改失败';
                }
            }, {
                id
            });
        }
    }
    mySql.end();
    const resObj = {
        data: null,
        msg: state || '更改成功',
        code: state ? 400 : 200
    }
    // res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

// 删除组或者项目
router.post('/del', async (req, res) => {
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
    mySql.createConnection(sqlName2); // 打开并连接数据库
    mySql.setMap(`${sqlName2}.menu`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    let state = null;
    const { uid, uuid } = req.body;
    // 查询成功后
    const obj = {
        uid
    }
    if(uuid) obj.uuid = uuid;
    await mySql.del(obj, (type, data) => {
        if(!type) {
            return state = '删除失败';
        }
    });
    mySql.end();
    const resObj = {
        data: null,
        msg: state || '删除成功',
        code: state ? 400 : 200
    }
    // res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

//导出该路由
module.exports = router;