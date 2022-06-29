var express = require('express');
var router = express.Router();
const clienteController = require("../controllers/clienteController.js")
const validacaoCadastro = require('../middlewares/validacaoCadastro.js');
const { body } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest:"public/uploads/fotos_perfil"});

router.get('/'/*,validacaologin*/, clienteController.usuario);

router.get('/cadastro',clienteController.cadastro);
router.post('/cadastro',validacaoCadastro,upload.single("foto_perfil"),clienteController.acaoCadastro);


module.exports = router;