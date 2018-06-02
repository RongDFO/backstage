var crypto = require('crypto');//md5加密
var nodemailer = require('nodemailer');//邮箱

module.exports = {
    responseJONS: function (response, result) {
        if (typeof result === 'undefined') {
            response.json({
                code: '0',
                msg: '操作失败！'
            })
        } else {
            response.json(result);
        }
    },
    //判断是否为空
    isEmpty: function (params) {
        if (params == undefined || params == null || params == 'null' || params == 'undefined'||params == '') {
            return true
        }else{
            return false
        }
    },
    //随机字符串
    randomString: function (length) {
        var length = length || 32;
        var randomString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
        var res = '';
        for (var i = 0; i <= length; i++) {
            res += randomString.charAt(Math.floor(Math.random() * randomString.length))
        }
        return res;
    },
    //加盐获取加密密码
    getSaltPassword: function (password, salt) {
        const saltPassword = password + ':' + salt;
        const md5 = crypto.createHash("md5");
        const result = md5.update(saltPassword).digest("hex");
        return result
    },
    sendEmail: function (mail) {
        // 创建一个SMTP客户端配置
        const config = {
            host: 'smtp.163.com',
            port: 25,
            auth: {
                user: 'kfr1924106306@163.com', //刚才注册的邮箱账号
                pass: 'kfr1924106306'  //邮箱的授权码，不是注册时的密码
            }
        };
        // 创建一个SMTP客户端对象
        var transporter = nodemailer.createTransport(config);
        return new Promise((resolve,reject)=>{
            transporter.sendMail(mail, function (error, info) {
                if (error) throw error;
                resolve(info);
            });
        })
    }
}