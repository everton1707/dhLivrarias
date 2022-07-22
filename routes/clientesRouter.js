var express = require('express');
var router = express.Router();
const clienteController = require("../controllers/clienteController");
const validacaoCadastro = require('../middlewares/validacaoCadastro');
const autenticacao = require('../middlewares/autenticacao');

const multer = require('multer');
const upload = multer({ dest:"public/uploads/fotos_perfil"});

router.get('/',autenticacao, clienteController.usuario);
router.get('/logout', autenticacao, clienteController.logout); // logout

router.get('/cadastrar',clienteController.cadastrar);
router.post('/cadastrar', upload.single("foto_perfil"), validacaoCadastro ,clienteController.acaoCadastrar);

router.get('/editar',clienteController.editar);
router.post('/editar', upload.single("foto_perfil"), validacaoCadastro ,clienteController.atualizar);

router.get('/login',clienteController.login);
router.post('/login',clienteController.acaoLogin);

router.get('/logout',clienteController.logout);

router.get('/deletar',clienteController.deletar);

router.get('/cadastroEndereco',clienteController.cadastroEndereco);

module.exports = router;