var express = require('express');
var router = express.Router();
const clienteController = require("../controllers/clienteController");
const validacaoCadastro = require('../middlewares/validacaoCadastro');
const autenticacao = require('../middlewares/autenticacao');

const multer = require('multer');
const upload = multer({ dest:"public/uploads/fotos_perfil"});

router.get('/',autenticacao, clienteController.usuario);

router.get('/cadastro',clienteController.cadastro);
router.post('/cadastro',upload.single("foto_perfil"),validacaoCadastro ,clienteController.acaoCadastro);

router.get('/login',clienteController.login);
router.post('/login',clienteController.logar);


router.get('/cadastroEndereco',clienteController.cadastroEndereco);
module.exports = router;