var express = require('express');
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken'); // 使用jwt签名
apiRoutes.use(function(req, res, next) {
    // 拿取token 数据 按照自己传递方式写
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {      
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token,'app.get(superSecret)', function(err, decoded) {  
              if (err) {
                console.log(err)
                return res.json({ success: false, message: '无效的token.' });    
              } else {
                // 如果验证通过，在req中写入解密结果
                req.decoded = decoded;  
                next(); //继续下一步路由
          }
        });
      } else {
        // 没有拿到token 返回错误 
        return res.status(403).send({ 
            success: false, 
            message: '没有找到token.' 
        });
      }
    });

module.exports = apiRoutes;