
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);

const { host } = require('../config');
//添加路由到应用上
/*
    接口文档
*/
// app.use('/', require('../routes/fileDown'));
app.use(host + '/user', require('../routes/user'));
app.use(host + '/menu', require('../routes/menu'));
app.use(host + '/project', require('../routes/project'));
app.use(host + '/request', require('../routes/request'));
/*
    接口文档 -end
*/
/*
    mobile
*/
app.use(host + '/mobile/user', require('../routers-mobile/user'));
/*
    mobile -end
*/
app.use(host + '/favicon.ico', function (req, res) {
    res.send();
});
//404判断
app.use(function (req, res) {
    const obj = {
        data: null,
        msg: '404',
        code: 404
    }
    res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
    res.end(JSON.stringify(obj));
});