const { canTreatArrayAsAnd } = require('sequelize/types/utils');
const db =require('../models');
const { carrinho } = require('./produtoController');

const pedidoController = {
    cadastrar: (req, res) => {
        res.render('cadastroEndereco');
    },
    editar: (req,res) => {

    },
    cancelar: (req,res) => {

    },
    listar: (req,res) => {

    },
    deletar: (req, res) => {
        
    },
    pagar: (req, res) => {

    },


}

carrinho.findOne({ user: req.user._id })



module.exports = pedidoController;