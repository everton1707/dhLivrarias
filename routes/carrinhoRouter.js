var express = require('express');
var router = express.Router();

const autenticacao = require('../middlewares/autenticacao');
const pedidoController = require('../controllers/pedidoController.js')



router.get('/',autenticacao, pedidoController.exibir);


router.post('/adicionar/:id',autenticacao, pedidoController.adicionar);
router.get('/remover/:id',autenticacao, pedidoController.removerItem);
router.get('/checkout/:id',autenticacao, pedidoController.pagamento);
router.get('/finalizar/:id',autenticacao, pedidoController.finalizar);

/*
/carrinho/finalizar/<%= pedido.id %>
router.get('/editar/:id', pedidoController.editar);
router.post('/editar/:id', pedidoController.atualizar);

router.get('/deletar/:id', pedidoController.deletar);*/


module.exports = router;