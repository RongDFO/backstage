const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
/**
 * 新闻模块
 */
var jwt = require('jsonwebtoken'); // 使用jwt签名
var apiRouter = require('../util/vertoken'); // 使用jwt签名
apiRouter.post('/getNewsClass',newsController.getNewsClass);//获取类别
apiRouter.post('/delectNewsClassByid',newsController.delectNewsClassByid);//删除类别
apiRouter.post('/add',newsController.add);//新增类别
module.exports = apiRouter;




