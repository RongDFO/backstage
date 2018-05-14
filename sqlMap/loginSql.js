module.exports = {
    register:"INSERT INTO `user_info` (username,createtime,password,phone,salt,status,usertype,realname,userid) VALUES (?,?,?,?,?,?,?,?,?)",
    getUserInfoByUserName:"SELECT * FROM `user_info` WHERE username=?"
}