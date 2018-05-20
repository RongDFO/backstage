const loginService = require('../service/loginService');
const util = require('../util/util');
module.exports = {
    login(req,res,next){
        const params = req.body || req.query;
        const password = params.password;
        const username = params.username;
        util.isNotEmpty(res,username,'账号不能为空');
        util.isNotEmpty(res,password,'密码不能为空');
        const loginres = loginService.loginService(params).then(result=>{
            util.responseJONS(res,result)
        })
    }
}