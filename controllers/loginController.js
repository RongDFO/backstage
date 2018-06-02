const loginService = require('../service/loginService');
const util = require('../util/util');
module.exports = {
    login(req,res,next){
        const params = req.body || req.query;
        const password = params.password;
        const username = params.username;
        if(util.isEmpty(username)){
            util.responseJONS(res,{
                code:0,
                msg:'用户名不能为空'
            })
            return;
        }
        if(util.isEmpty(password)){
            util.responseJONS(res,{
                code:0,
                msg:'密码不能为空'
            })
            return;
        }
        const loginres = loginService.loginService(params).then(result=>{
            util.responseJONS(res,result)
        })
    }
}