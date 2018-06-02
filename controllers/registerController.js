const registerService = require('../service/registerService');
const util = require('../util/util');
const moment = require('moment');
var uuidv1 = require('uuid');

module.exports={
    // 注册
    register(req,res,next){
        const params = req.body || req.query;
        const username = params.username;
        const password = req.body.password;
        const email = req.body.email;
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
        if(util.isEmpty(email)){
            util.responseJONS(res,{
                code:0,
                msg:'邮箱不能为空'
            })
            return;
        }
        params.usertype = req.body.usertype==undefined?1:req.body.usertype
        params.createtime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        params.status = req.body.status==undefined?1:req.body.status;
        params.userid = uuidv1();
        params.salt = util.randomString(16)
        params.password = util.getSaltPassword(password,params.salt);
        registerService.register(params).then((result)=>{
            util.responseJONS(res,result)
        })
    },
    //验证发送邮件
    sendMail(req,res,next){
        const params = req.body || req.query;
        const username = params.username;
        params.code = util.randomString(4);
        params.isverification = 0;
        params.expired = moment(new Date()).add(40,'m').format('YYYY-MM-DD HH:mm:ss');
        if(util.isEmpty(username)){
            util.responseJONS(res,{
                code:0,
                msg:'用户名不能为空'
            })
            return;
        }
        registerService.saveCode(params).then((code)=>{
            if(code){
                util.responseJONS(res,code)
            }
        })
    },
    //验证密码
    verificateCode:function(req,res,next){
        const params = req.body || req.query;
        const username = params.username;
        const code = params.code;
        params.expired = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        if(util.isEmpty(username)){
            util.responseJONS(res,{
                code:0,
                msg:'用户名不能为空'
            })
            return;
        }
        if(util.isEmpty(code)){
            util.responseJONS(res,{
                code:0,
                msg:'验证码不能为空'
            })
            return;
        }
        registerService.verificateCode(params).then(verificateCodeRes=>{
            util.responseJONS(res,verificateCodeRes)
        })
        
    },
    // 修改密码
    modifyPassword:function(req,res,next){
        const params = req.body || req.query;
        const username = params.username;
        const password = params.password;
        const code = params.code;
        params.salt = util.randomString(16);
        params.password = util.getSaltPassword(password,params.salt);
        params.expired = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        if(util.isEmpty(password)){
            util.responseJONS(res,{
                code:0,
                msg:'密码不能为空'
            })
            return;
        }
        if(util.isEmpty(username)){
            util.responseJONS(res,{
                code:0,
                msg:'用户名不能为空'
            })
            return;
        }
        if(util.isEmpty(code)){
            util.responseJONS(res,{
                code:0,
                msg:'验证码不能为空'
            })
            return;
        }
        registerService.modifyPassword(params).then(modifyPasswordRes=>{
            util.responseJONS(res,modifyPasswordRes)
        })
    }
}