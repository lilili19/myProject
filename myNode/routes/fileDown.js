
const fs = require('fs');
const express = require('express');
let router = express.Router();
// index
router.get('/', function (req, res) {
    fs.readFile("./dist/index.html", function (err, data) {
        if (err) {
            console.log("read error: " + err);
            res.send();
            return;
        }
        res.end(data);
    })
});
router.get('/static/*', function (req, res) {
    fs.readFile("./dist" + req.url, function (err, data) {
        if (err) {
            console.log("read error: " + err);
            res.send();
            return;
        }
        res.end(data);
    })
});
//导出该路由
module.exports = router;