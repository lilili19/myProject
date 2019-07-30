
const express = require('express');
const { checkToken } = require('../token/token');
const request = require('request');
let router = express.Router();

// 获取接口项目列表 && 详情
router.post('/', async (req, res) => {
    const { token } = req.headers;
    const { cheak, code, msg, userName } = checkToken(token);
    if(!cheak) {
        return res.send(JSON.stringify({
            data: null,
            msg,
            code
        }));
    }
    const { host, url, method, data, header } = req.body;
    let json = '';
    try {
        json = data && JSON.parse(data);
    } catch(error) {
        return res.send({
            code: 400,
            msg: 'data参数必须为JSON或空',
            data: null
        })
    }
    if(json && json.constructor !== Object) {
        return res.send({
            code: 400,
            msg: 'data参数必须为JSON或空',
            data: null
        })
    }
    let obj = {
        url: host + url,
        method,
        json: true,
        body: json || {},
        headers: header && JSON.parse(header)
    }
    request(obj, function(error, response, body) {
        if(error) {
            console.log('error:', error);
            res.send(error);
        } else if (response.statusCode == 200) {
            res.send(body); // 请求成功的处理逻辑
        }
    })
});

//导出该路由
module.exports = router;