const loginDao = require('../dao/loginDao');
const jwt = require('jsonwebtoken'); // 使用jwt签名
const util = require('../util/util');
const config = require('../config/config');
module.exports = {
    async loginService(params){
        const loginres  = await loginDao.loginDao(params);
        const newpass = util.getSaltPassword(params.password,loginres[0].salt);
        console.log(newpass)
        console.log(loginres[0].password)
        if(loginres.length>0&&newpass==loginres[0].password){
            const token = jwt.sign({
                username:params.username,
                password:params.password,
            },'app.get(superSecret)',{
                expiresIn : config.tokenExpiration// 授权时效24小时
              });
            const code = {
                code : 1,
                msg : '登陆成功',
                token:token
            }
            return code;
        }else{
            const code = {
                code : 0,
                msg : '账号或密码错误',
            }
            return code;
        }
    }
}