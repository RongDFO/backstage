const mysql = require('mysql');
const loginSql = require('../sqlMap/loginSql');
const config = require('../config/config');
const pool = mysql.createPool(config.mysql);
module.exports = {
    loginDao(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err,connection){
                connection.query(loginSql.loginSql,[params.username],function(err,result){
                    if(err) throw err
                    else
                    return resolve(JSON.parse(JSON.stringify(result)));
                })
            })
        })
    }
}