var loginDao = require('../dao/loginDao');

module.exports = {
    register(req, res, next){
        loginDao.register(req, res, next);
    }
}