const db = require("../models");
const { validationResult } = require("express-validator");

const indexController = {
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
    }
}   

module.exports = indexController;