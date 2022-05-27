var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController');

/* GET home page. */
router.get('/', produtoController.index);

router.get('/faleConosco', produtoController.faleConosco);
router.get('/usuario', produtoController.usuario);

router.get('/login',produtoController.login);
router.get('/cadastro',produtoController.cadastro);
router.get('/finalizacao', produtoController.finalizacao);
router.get('/checkout', produtoController.checkout);
router.get('/carrinho', produtoController.carrinho);
router.get('/produto', produtoController.produto);
router.get('/produto', produtoController.produto);



module.exports = router;
