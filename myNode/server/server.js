
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);

//添加路由到应用上
// app.use('/', require('../routes/fileDown'));
app.use('/user', require('../routes/user'));
app.use('/menu', require('../routes/menu'));
app.use('/project', require('../routes/project'));
app.use('/request', require('../routes/request'));

app.use('/favicon.ico', function (req, res) {
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