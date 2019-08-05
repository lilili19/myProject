
const operationMySql = require('../sql/operationMySql');
const jwt = require('jsonwebtoken');
const { sqlName } = require('../config');

// 生成token
const createToken = (userName) => {
    let content = { userName }; // 要生成token的主题信息
    let secretOrPrivateKey = "suiyi" // 这是加密的key（密钥） 
    const token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60*60*1  // 1小时过期
    });
    return token;
}

// token检验（拦截器检测）
const checkToken = (token) => {
    if(!token) {
        return {
            cheak: false,
            code: 401,
            msg: 'token不存在',
            userName: ''
        };
    }
    let obj = {};
    let secretOrPrivateKey="suiyi"; // 这是加密的key（密钥） 
    jwt.verify(token, secretOrPrivateKey, function (err, decode) {
        if (err) {  //  时间失效的时候/ 伪造的token          
            obj = {
                cheak: false,
                code: 401,
                msg: 'token无效',
                userName: ''
            }
        } else {
            // console.log('token:', token)
            // console.log('user:', JSON.stringify(decode))
            obj = {
                cheak: true,
                code: 200,
                msg: 'token验证成功',
                userName: decode.userName
            }
        }
    })
    return obj;
}
module.exports = {
    createToken,
    checkToken
}