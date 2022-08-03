const db = require("../models");
const { validationResult } = require("express-validator");

const indexController = {
    index: async (req, res) => {
        const produtos = await db.Produto.findAll();
        const generos = await db.Genero.findAll();
        const Admin = req.session.admin;
        //res.send(generos)
        res.render('home',{ 
            produtos: produtos, 
            generos: generos,
            Admin
        });
    },
    faleConosco: (req, res) => {
        const Admin = req.session.admin;
        res.render('faleConosco',{
            Admin
        });
    },
   
}   

module.exports = indexController;