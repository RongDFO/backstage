
var mysql = require('mysql');
var config = require('../config/config');
var registerSql = require('../sqlMap/registerSql');
var pool = mysql.createPool(config.mysql);
module.exports={
    register(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err,connection){ 
                 connection.query(registerSql.register,[params.username,params.createtime,params.password,params.status,params.usertype,params.userid,params.salt,params.email],function(err,result){
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
    saveCode(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err,connection){
                connection.query(registerSql.saveCode,[params.code,params.isverification,params.user_id,params.expired,params.code,params.isverification,params.expired],function(err,result){
                    if(err) throw err
                    else
                    return resolve(result);
                })
            })
        })
    },
    verificateCode(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err,connection){
                connection.query(registerSql.verificateCode,[params.username,params.code,params.expired],function(err,result){
                    if(err) throw err
                    else
                    return resolve(result);
                })
            })
        })
    },
    modifyPassword(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err,connection){
                connection.query(registerSql.modifyPassword,[params.password,params.salt,params.username],function(err,result){
                    if(err) throw err
                    else
                    return resolve(result);
                })
            })
        })  
    }
}