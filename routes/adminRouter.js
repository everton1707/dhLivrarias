var express = require('express');
var router = express.Router();


const adminController = require("../controllers/adminController");
const validacaoCadastro = require('../middlewares/validacaoCadastro');
const autenticacao = require('../middlewares/autenticacao');

const multer = require('multer');
const upload = multer({ dest:"public/uploads/fotos_perfil"});

router.get('/',autenticacao, adminController.admin);
router.get('/logout', autenticacao, adminController.logout); // logout

router.get('/cadastrar',adminController.cadastrar);
router.post('/cadastrar', upload.single("foto_perfil"), validacaoCadastro ,adminController.acaoCadastrar);

router.get('/editar',adminController.editar);
router.post('/editar', upload.single("foto_perfil"), validacaoCadastro ,adminController.atualizar);

router.get('/login',adminController.login);
router.post('/login',adminController.acaoLogin);

router.get('/logout',adminController.logout);

router.get('/deletar',adminController.deletar);

router.get('/cadastroEndereco',adminController.cadastroEndereco);

module.exports = router;







module.exports =router;