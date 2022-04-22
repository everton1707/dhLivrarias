var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController');

/* GET home page. */
router.get('/', produtoController.index);
router.get('/user', produtoController.user);

module.exports = router;
