module.exports = {
    register:"INSERT INTO user_info (username,createtime,password,status,usertype,userid,salt) VALUES (?,?,?,?,?,?,?)",
    getUserByUsername:"SELECT * FROM user_info WHERE USERNAME = ?"
}