
const express = require('express');
const operationMySql = require('../sql/operationMySql');
const { timeConversion } = require('../commonMethod');
const { checkToken } = require('../token/token');
const { sqlName2 } = require('../config');
let router = express.Router();

// 获取接口项目列表 && 详情
router.get('/list', async (req, res) => {
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
    mySql.setMap(`${sqlName2}.project`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    let state = null, queryData = {};
    const { id, uuid, key, method, pageIndex, pageSize, startTime, endTime } = req.query;
    const obj = {
        id,
        userName,
        uuid,
        method: method || null
    };
    await mySql.query(obj, (type, data) => {
        if(!type) {
            return state = '查询失败';
        }
        if(pageIndex) { // 带总条数查询
            queryData = {
                count: data[1][0]['count(*)'],
                list: data[0].map(e => { e.createDate = timeConversion(e.createDate, 'YY-MM-DD HH:MM:SS'); return e })
            }
        } else { // 不带总条数查询
            queryData = data;
        }
        
    }, {
        pageIndex, pageSize
    } , key ? {
        name: key
    } : null);
    mySql.end();
    const resObj = {
        data: queryData,
        msg: state || '查询成功',
        code: state ? 400 : 200
    }
    // res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

// 增加或者修改接口项目
router.post('/addEdit', async (req, res) => {
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
    mySql.setMap(`${sqlName2}.project`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    let state = null, resId = null;
    let obj = req.body;
    obj.userName = userName;
    if(obj.id) {
        await mySql.update(obj, (type, data) => {
            if(!type) {
                return state = '修改失败';
            }
            id = obj.id;
        }, {
            id: obj.id
        });
    } else {
        const { uuid, name } = obj;
        await mySql.query({
            userName,
            uuid,
            name
        }, (type, data) => {
            if(!type) {
                return state = '查询失败';
            }
            if(data.length !== 0) state = '接口名已存在';
        });
        if(!state) {
            obj.createDate = timeConversion(new Date(), 'YY-MM-DD HH:MM:SS');
            const { id, ...newObj } = obj;
            await mySql.add(newObj, (type, data) => {
                if(!type) {
                    return state = '添加失败';
                }
                resId = data.insertId; // 将新增的id记录 返回给前端
            });
        }
    }
    mySql.end();
    const resObj = {
        data: resId,
        msg: state || (obj.id ? '修改成功' : '新增成功'),
        code: state ? 400 : 200
    }
    // res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
    res.send(JSON.stringify(resObj));
});

// 删除接口项目
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
    mySql.setMap(`${sqlName2}.project`); // 设置数据库将要操作的表
    /*
        打开连接数据库表end
    */
    const { id } = req.body;
    let state = null;
    await mySql.del({ id }, (type, data) => {
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