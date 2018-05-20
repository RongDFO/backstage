var express = require('express');
var app = express();
var router = express.Router();
var loginController = require('../controllers/loginController');

// auth
router.post('/', loginController.login);
 
module.exports = router;