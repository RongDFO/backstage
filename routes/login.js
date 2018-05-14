var express = require('express');
var router = express.Router();
var loginController  = require('../controllers/loginController')

/* GET home page. */
router.post('/register', function(req, res, next) {
    loginController.register(req, res, next);
});

module.exports = router;
