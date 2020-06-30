
// const express = require('express');
// let app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.listen(3000);

// const { host } = require('../config');
// //添加路由到应用上
// /*
//     接口文档
// */
// // app.use('/', require('../routes/fileDown'));
// app.use(host + '/user', require('../routes/user'));
// app.use(host + '/menu', require('../routes/menu'));
// app.use(host + '/project', require('../routes/project'));
// app.use(host + '/request', require('../routes/request'));
// /*
//     接口文档 -end
// */
// /*
//     mobile
// */
// app.use(host + '/mobile/user', require('../routers-mobile/user'));
// /*
//     mobile -end
// */
// app.use(host + '/favicon.ico', function (req, res) {
//     res.send();
// });
// //404判断
// app.use(function (req, res) {
//     const obj = {
//         data: null,
//         msg: '404',
//         code: 404
//     }
//     res.writeHead(404, { "Content-Type":"text/plain;charset=utf-8" });
//     res.end(JSON.stringify(obj));
// });



var fs = require('fs');
var http = require('http');
var server = http.createServer()
server.listen(3000)
server.on('request',function(request,response){
	const str = 'C:/Users/win 10/Desktop/门户';
    var url = request.url;

    //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
    response.writeHead(200,{'Content-Type':'text/html'})
    // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
    console.log(str + url)
    if(url === '/favicon.ico') return '';
    fs.readFile(str + url ,'',function(err,data){
        if(err){
            throw err ;
        }
        response.end(data);
    });
    
});