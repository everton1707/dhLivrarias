var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest:"public/uploads/fotos_perfil"});

//const adminController = require("../controllers/adminController");
const produtoController = require('../controllers/produtoController.js');


const autenticacaoAdmin = require('../middlewares/autenticacaoAdmin');



var generosRouter = require("./generosRouter.js");




router.get('/produto/criar',autenticacaoAdmin, produtoController.criar);
router.post('/produto/salvar',autenticacaoAdmin,upload.single("foto_livro"), produtoController.salvar);

router.get('/produto/editar/:id',autenticacaoAdmin, produtoController.editar);
router.post('/produto/editar/:id',autenticacaoAdmin,upload.single("foto_livro"), produtoController.atualizar);

router.get('/produto/deletar/:id',autenticacaoAdmin, produtoController.deletar);









module.exports = router;







module.exports =router;