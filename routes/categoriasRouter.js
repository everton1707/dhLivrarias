var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "public/uploads/fotos_categorias" });
const categoriaController = require('../controllers/categoriaController.js')



router.get('/', categoriaController.listar);
//criar rota para editar categoria a apartir da listagem


router.get('/criar', categoriaController.criarCategoria);
router.post('/salvar', categoriaController.salvarCategoria);


module.exports = router;