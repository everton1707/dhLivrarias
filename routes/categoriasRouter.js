var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "public/uploads/fotos_categorias" });
const categoriaController = require('../controllers/categoriaController.js')



router.get('/', categoriaController.listar);
//criar rota para editar categoria a apartir da listagem


router.get('/criar', categoriaController.criar);
router.post('/salvar', categoriaController.salvar);//fazer validação e implementar fotos

router.get('/editar/:id', categoriaController.editar);
router.post('/editar/:id', categoriaController.atualizar);

router.get('/deletar/:id', categoriaController.deletar);


module.exports = router;