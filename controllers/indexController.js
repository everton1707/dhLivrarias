const db = require("../models");
const { validationResult } = require("express-validator");

const indexController = {
    index: async (req, res) => {
        const produtos = await db.Produto.findAll();
        const generos = await db.Genero.findAll();
       
        //res.send(generos)
        res.render('home',{ 
            produtos: produtos, 
            generos: generos });
    },
    faleConosco: (req, res) => {
        res.render('faleConosco');
    },

    finalizacao: (req, res) => {
        res.render('finalizacao');
    },
   
}   

module.exports = indexController;