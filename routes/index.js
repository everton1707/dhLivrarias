var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController');
const adminController = require('../controllers/adminController');
const autenticacao = require('../middlewares/autenticacao');
const { body } = require('express-validator');
const validacao = [
    body("nome").notEmpty().isString(),
    body("descricao").notEmpty().isString(),
];
    /* GET home page. */
router.get('/', produtoController.index);

router.get('/faleConosco', produtoController.faleConosco);


router.get('/usuario',autenticacao, adminController.usuario);


router.get('/logar',adminController.logar);

router.get('/login'/*,autenticacao*/,produtoController.login);
router.get('/cadastro',produtoController.cadastro);
router.get('/finalizacao', produtoController.finalizacao);
router.get('/checkout', produtoController.checkout);
router.get('/carrinho', produtoController.carrinho);
router.get('/produto', produtoController.produto);
router.get('/criarCategoria', produtoController.criarCategoria);
router.post('/salvarCategoria',validacao, produtoController.salvarCategoria);



module.exports = router;
