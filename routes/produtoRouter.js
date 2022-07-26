var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController.js');
const multer = require('multer');
const upload = multer({ dest:"public/uploads/fotos_produtos"});

router.get('/', produtoController.listar);


router.get('/criar', produtoController.criar);
router.post('/salvar',upload.single("foto_livro"), produtoController.salvar);

router.get('/editar/:id', produtoController.editar);
router.post('/editar/:id',upload.single("foto_livro"), produtoController.atualizar);

router.get('/deletar/:id', produtoController.deletar);


router.get('/:id', produtoController.exibir);



module.exports = router;