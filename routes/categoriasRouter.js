var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest:"public/uploads/fotos_categorias"});
const categoriaController = require('../controllers/categoriaController.js')



//router.get('/', categoriaController.listarCategorias); 
//criar rota para editar categoria a apartir da listagem


router.get('/criarCategoria', categoriaController.criarCategoria);
router.post('/salvarCategoria', categoriaController.salvarCategoria);


module.exports = router;