module.exports = {
    register:"INSERT INTO user_info (username,createtime,password,status,usertype,userid,salt,email) VALUES (?,?,?,?,?,?,?,?)",
    getUserByUsername:"SELECT * FROM user_info WHERE USERNAME = ?",
    saveCode:"INSERT INTO user_code  (code,isverification,user_id,expired) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE code=?,isverification=?,expired=?;",
    verificateCode:"SELECT * FROM user_info t1 LEFT JOIN user_code t2 on t1.userid = t2.user_id  WHERE t1.username = ? AND t2.code = ? AND t2.expired>?",
    modifyPassword:"UPDATE user_info SET password = ?,salt=? WHERE username = ?"
}