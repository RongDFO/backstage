const registerService = require('../service/registerService');
const util = require('../util/util');
const moment = require('moment');
var uuidv1 = require('uuid');

module.exports={
    register(req,res,next){
        const params = req.body || req.query;
        const username = params.username;
        const password = req.body.password;
        util.isNotEmpty(res,username,'用户名不能为空');
        util.isNotEmpty(res,password,'密码不能为空');
        params.usertype = req.body.usertype==undefined?1:req.body.usertype
        params.createtime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        params.status = req.body.status==undefined?1:req.body.status;
        params.userid = uuidv1();
        params.salt = util.randomString(16)
        params.password = util.getSaltPassword(password,params.salt);
        registerService.register(params).then((result)=>{
            util.responseJONS(res,result)
        })
    }
}