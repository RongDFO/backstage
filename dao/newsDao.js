const mysql = require('mysql');
const newsql = require('../sqlMap/newsSql');
const config = require('../config/config');
const pool = mysql.createPool(config.mysql);
module.exports = {
    getNewsClass(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function (err,connection) {  
                connection.query(newsql.getNewsClass,[],function (err,result) {  
                    if(err) throw err;
                    else
                    return resolve(JSON.parse(JSON.stringify(result)));
                })
            })
        })
    },
    delectNewsClassByid(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function (err,connection) {  
                console.log(params.id)
                connection.query(newsql.delectNewsClassByid,[params.id],function (err,result) {  
                    if(err) throw err;
                    else
                    return resolve(JSON.parse(JSON.stringify(result)));
                })
            })
        })
    },
    add(params){
        return new Promise((resolve,reject)=>{
            pool.getConnection(function (err,connection) {  
                connection.query(newsql.add,[params.name,params.sort,params.desc],function (err,result) {  
                    if(err) throw err;
                    else
                    return resolve(JSON.parse(JSON.stringify(result)));
                })
            })
        }) 
    }
}