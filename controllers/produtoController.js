const db = require("../models");
const { validationResult } = require("express-validator");
const id = require("faker-br/lib/locales/id_ID");
const fs = require("fs");

const produtoController = {

    exibir: async (req, res) => {
        const idLivro = req.params.id;
        const Admin = req.session.admin;
        const livro = await db.Produto.findByPk(idLivro, { include: ["genero"] })

        res.render('produto', { livro, Admin});
    },
    listar: (req, res) => {
        const Admin = req.session.admin;
        db.Produto.findAll({ include: ["genero"] }).then(livros => {
            res.render('listarProdutos', { livros, Admin })
        });
    },


}



module.exports = produtoController;