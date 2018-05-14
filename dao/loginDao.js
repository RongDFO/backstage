var mysql = require('mysql');
var config = require('../config/config');
var pool = mysql.createPool(config.mysql);
var loginSql = require('../sqlMap/loginSql');
var util = require('../util/util');
var moment = require('moment');
var uuidv1 = require('uuid/v1');


module.exports = {
    register(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            const params = req.body || req.params;
            console.log(params)
            const password = params.password;
            const username = params.username;
            const phone = params.phone;
            const status = params.status;
            const usertype = params.usertype;
            const realname = params.realname;
            this.getUserInfoByUserName(req,res,next,username,function () { 
                var now = moment(new Date()).format("YYYY-MM-DD hh:mm:ss"); 
                const userid = uuidv1();
                const salt = util.randomString(16)
                const saltPassword = util.getSaltPassword(password,salt);
                connection.query(loginSql.register,[username,now,saltPassword,phone,salt,status,usertype,realname,userid],function (err,result) {  
                    if(err) throw err;
                    if(result){
                        result = {
                            code : 200,
                            msg : '增加用户成功！'
                        }
                        util.responseJONS(res,result)
                    }
                })
            });
           
          
            connection.release();
        })
    },
    getUserInfoByUserName:function (res,res,next,username,callback) {  
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            connection.query(loginSql.getUserInfoByUserName,[username],function (err,result) { 
                if(err) throw err;
                if(result){
                    if(result.length>0){
                        result = {
                            code : 0,
                            msg : '该用户名已注册'
                        }
                        util.responseJONS(res,result)
                    }else{
                        callback();
                    }
                }
            })
        })
    }
}