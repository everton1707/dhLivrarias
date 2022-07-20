var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "public/uploads/fotos_generos" });
const generoController = require('../controllers/generoController.js')



router.get('/', generoController.listar);
//criar rota para editar categoria a apartir da listagem


router.get('/criar', generoController.criar);
router.post('/salvar', upload.single("foto_genero"), generoController.salvar);//fazer validação e implementar fotos

router.get('/editar/:id', generoController.editar);
router.post('/editar/:id', generoController.atualizar);

router.get('/deletar/:id', generoController.deletar);


module.exports = router;