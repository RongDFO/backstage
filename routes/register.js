var express = require('express');
var router = express.Router();
var registerController = require('../controllers/registerController')

router.post('/',registerController.register);
router.post('/sendMail',registerController.sendMail);
module.exports = router;