const registerDao = require('../dao/registerDao');
const util = require('../util/util');


module.exports={
    async register(params){
        try{
            const result = await registerDao.getUserByUsername(params);
            if(result.length>0){
                code = {
                    code : 0,
                    msg : '用户名重复'
                }
                return code
            }
            await registerDao.register(params); //注册
                code = {
                    code : 1,
                    msg : '操作成功'
                }
             return code
        }catch(err){
            throw err
        }
    },
    async saveCode(params){
        try{
            const userResult = await registerDao.getUserByUsername(params);
            if(userResult.length<=0){
                var code = {
                    code : 0,
                    msg : '没有该用户！'
                }
                return code
            }else{
                params.user_id = JSON.parse(JSON.stringify(userResult))[0].userid;
                var email = JSON.parse(JSON.stringify(userResult))[0].email;
            }
            var mail = {
                // 发件人
                from: '米彩 <kfr1924106306@163.com>',
                // 主题
                subject: '密码修改',
                // 收件人
                to: email,
                // 邮件内容，HTML格式
                text: '感谢您的支持，您的验证码是'+params.code//接收激活请求的链接
            };
            await registerDao.saveCode(params);
            util.sendEmail(mail);
            var code = {
                code : 1,
                msg : '发送成功'
            }
            return code
        }catch(err){
            throw err
        }
    },
    async verificateCode(params){
        try{
            const userResult = await registerDao.getUserByUsername(params);
            if(userResult.length<=0){
                code = {
                    code : 0,
                    msg : '没有该用户！'
                }
                return code
            }else{
                const verificateResult = await registerDao.verificateCode(params);
                if(verificateResult.length<=0){
                    code = {
                        code : 0,
                        msg : '验证码错误或过期'
                    }
                }else{
                    code = {
                        code : 1,
                        msg : '验证成功！'
                    }
                }
                return code;
            }
        }catch(err){
            throw err
        }
        
    },
    async modifyPassword(params){
        try{
            const userResult = await registerDao.getUserByUsername(params);
            if(userResult.length<=0){
               var code = {
                    code : 0,
                    msg : '没有该用户！'
                }
                return code
            }else{
                const verificateResult = await registerDao.verificateCode(params);
                if(userResult.length>0){
                    const userResult = await registerDao.modifyPassword(params);
                    code = {
                        code : 1,
                        msg : '操作成功'
                    }
                    return code
                }else{
                    var code = {
                        code : 0,
                        msg : '验证码以过期请重新发送验证码!'
                    }
                }
                return code;
            }
        }catch(err){
            throw err
        }
    }
}