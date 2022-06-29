var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController.js');

var usuariosRouter = require("./usuario.js")



router.use("/usuario",usuariosRouter);



router.get('/', produtoController.index);

router.get('/faleConosco', produtoController.faleConosco);


router.get('/finalizacao', produtoController.finalizacao);
router.get('/checkout', produtoController.checkout);
router.get('/carrinho', produtoController.carrinho);
router.get('/produto', produtoController.produto);
router.get('/criarCategoria', produtoController.criarCategoria);
router.post('/salvarCategoria', produtoController.salvarCategoria);



module.exports = router;
