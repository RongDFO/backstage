var express = require('express');
// var app = express();
// var router = express.Router();
var jwt = require('jsonwebtoken'); // 使用jwt签名
var apiRouter = require('../util/vertoken'); // 使用jwt签名

apiRouter.post('/',function (req, res, next) {
    res.json({
        success: true,
    });
});
module.exports = apiRouter;