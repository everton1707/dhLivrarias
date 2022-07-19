var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController.js');
const multer = require('multer');
const upload = multer({ dest:"public/uploads/fotos_produtos"});

router.get('/lista', produtoController.listar);

router.get('/criar', produtoController.criar);
router.post('/salvar',upload.single("foto_produto"), produtoController.salvar);

router.get('/editar/:id', produtoController.editar);
router.post('/editar/:id', produtoController.atualizar);

router.get('/deletar/:id', produtoController.deletar);


router.get('/:id', produtoController.exibir);



module.exports = router;