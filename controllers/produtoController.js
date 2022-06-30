const db = require("../models");
const { validationResult } = require("express-validator");
const sequelize = db.sequelize;




const produtoController = {
    index: (req, res) => {
        res.render('home');
    },
    faleConosco: (req, res) => {
        res.render('faleConosco');
    },

    finalizacao: (req, res) => {
        res.render('finalizacao');
    },
    checkout: (req, res) => {
        res.render('checkout');
    },
    carrinho: (req, res) => {
        res.render('carrinho');
    },
    produto: (req, res) => {
        res.render('produto');
    },
 
    

}



module.exports = produtoController;