var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
/* GET users listing. */
router.get('/',userController.index);
router.get('/login',userController.login);
router.get('/cadastro',userController.cadastro);
router.get('/finalizacao', userController.finalizacao);
router.get('/checkout', userController.checkout);

module.exports = router;
