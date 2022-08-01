var express = require('express');
var router = express.Router();


const pedidoController = require('../controllers/pedidoController.js')



router.get('/', pedidoController.exibir);


router.post('/adicionar/:id', pedidoController.adicionar);
router.get('/remover/:id', pedidoController.removerItem);
router.get('/checkout/:id', pedidoController.pagamento);
router.get('/finalizar/:id', pedidoController.finalizar);

/*
/carrinho/finalizar/<%= pedido.id %>
router.get('/editar/:id', pedidoController.editar);
router.post('/editar/:id', pedidoController.atualizar);

router.get('/deletar/:id', pedidoController.deletar);*/


module.exports = router;