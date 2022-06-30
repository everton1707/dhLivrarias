var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController.js');




var usuariosRouter = require("./usuariosRouter.js");
var categoriasRouter = require("./categoriasRouter.js");




router.use("/usuario",usuariosRouter);
router.use("/categoria",categoriasRouter);





router.get('/', produtoController.index);

router.get('/faleConosco', produtoController.faleConosco);


router.get('/finalizacao', produtoController.finalizacao);
router.get('/checkout', produtoController.checkout);
router.get('/carrinho', produtoController.carrinho);
router.get('/produto', produtoController.produto);




module.exports = router;
