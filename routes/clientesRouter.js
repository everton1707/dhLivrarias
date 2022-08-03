var express = require('express');
var router = express.Router();
const clienteController = require("../controllers/clienteController");
const validacaoCadastro = require('../middlewares/validacaoCadastro');
const autenticacao = require('../middlewares/autenticacao');
const autenticacaoCadastro = require('../middlewares/autenticacaoCadastro');
const autenticacaoLogin = require('../middlewares/autenticacaoLogin');

const multer = require('multer');
const upload = multer({ dest:"public/uploads/fotos_perfil"});

router.get('/',autenticacao, clienteController.usuario);
router.get('/logout', autenticacao, clienteController.logout); // logout

router.get('/cadastrar',autenticacaoCadastro, clienteController.cadastrar);
router.post('/cadastrar', upload.single("foto_perfil"), validacaoCadastro ,clienteController.acaoCadastrar);

router.get('/editar',clienteController.editar);
router.post('/editar', upload.single("foto_perfil"), validacaoCadastro ,clienteController.atualizar);

router.get('/login',autenticacaoLogin, clienteController.login);
router.post('/login',clienteController.acaoLogin);

router.get('/logout',clienteController.logout);

router.get('/deletar',clienteController.deletar);


module.exports = router;