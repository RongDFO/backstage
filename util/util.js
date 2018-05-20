var crypto = require('crypto');
module.exports = {
    responseJONS : function (response,result) {
        if(typeof result === 'undefined'){
            response.json({
                code : '0',
                msg : '操作失败！'
            })
        }else{
            response.json(result);
        }
    },
    //判断是否为空
    isNotEmpty:function(res,params,Strings){
        if(params==undefined||params==null||params=='null'||params=='undefined'){
        console.log('ok')
            return res.status(200).json({
                code:0,
                data:Strings
            })
        }
    },
     //随机字符串
     randomString:function (length) {
        var length = length ||32;
        var randomString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
        var res = '';
        for(var i=0;i<=length;i++){
          res += randomString.charAt(Math.floor(Math.random()*randomString.length))
        }
        return res;
    },
    //加盐获取加密密码
    getSaltPassword:function (password,salt) {  
        const saltPassword = password+':'+salt;
        const md5 = crypto.createHash("md5");
        const result = md5.update(saltPassword).digest("hex");
        return result
    }
}