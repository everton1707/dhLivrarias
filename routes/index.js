var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController');

/* GET home page. */
router.get('/', produtoController.index);

router.get('/faleConosco', produtoController.faleConosco);


module.exports = router;
