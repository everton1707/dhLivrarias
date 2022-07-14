var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController.js');


router.get('/lista', produtoController.listar);

router.get('/criar', produtoController.criar);
router.post('/salvar', produtoController.salvar);

router.get('/editar/:id', produtoController.editar);
router.post('/editar/:id', produtoController.atualizar);

router.get('/deletar/:id', produtoController.deletar);


router.get('/', produtoController.exibir);



module.exports = router;