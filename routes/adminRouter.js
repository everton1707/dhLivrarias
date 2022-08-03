var express = require('express');
var router = express.Router();
const multer = require('multer');
const uploadProdutos = multer({ dest:"public/uploads/fotos_produtos"});


const adminController = require('../controllers/adminController.js');

var generosRouter = require("./generosRouter.js");

const autenticacaoAdmin = require('../middlewares/autenticacaoAdmin');



var generosRouter = require("./generosRouter.js");

router.use("/genero",generosRouter);


//produtos
router.get('/produto/criar',autenticacaoAdmin, adminController.produtoCriar);
router.post('/produto/salvar',uploadProdutos.single("foto_livro"),autenticacaoAdmin,  adminController.produtoSalvar);
router.get('/produto/editar/:id',autenticacaoAdmin, adminController.produtoEditar);
router.post('/produto/editar/:id',uploadProdutos.single("foto_livro"),autenticacaoAdmin,  adminController.produtoAtualizar);
router.get('/produto/deletar/:id',autenticacaoAdmin, adminController.produtoDeletar);









module.exports = router;