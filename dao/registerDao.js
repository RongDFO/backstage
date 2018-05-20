
var mysql = require('mysql');
var config = require('../config/config');
var registerSql = require('../sqlMap/registerSql');
var pool = mysql.createPool(config.mysql);
module.exports={
    register(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err,connection){ 
                 connection.query(registerSql.register,[params.username,params.createtime,params.password,params.status,params.usertype,params.userid,params.salt],function(err,result){
                    if(err) throw err
                    else return resolve(result)
                 })
            })
        })
    },
    getUserByUsername(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err,connection){
                connection.query(registerSql.getUserByUsername,[params.username],function(err,result){
                    if(err) throw err
                    else
                    return resolve(result);
                })
            })
        })
       
    },
}