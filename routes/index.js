var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController.js');
const autenticacao = require('../middlewares/autenticacao');




var clientesRouter = require("./clientesRouter.js");
//var generosRouter = require("./generosRouter.js");     ***admin
var produtoRouter = require("./produtoRouter.js");
var carrinhoRouter = require("./carrinhoRouter.js");
var adminRouter = require("./adminRouter.js");


router.use("/carrinho",autenticacao,carrinhoRouter);
router.use("/usuario",clientesRouter);

router.use('/produto', produtoRouter);
router.use('/admin',  adminRouter);





router.get('/', indexController.index);

router.get('/faleConosco', indexController.faleConosco);

router.get('/finalizacao', indexController.finalizacao);




module.exports = router;
