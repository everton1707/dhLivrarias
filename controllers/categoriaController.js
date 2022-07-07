const db = require("../models");
const { validationResult } = require("express-validator");

const categoriaController = {

    criarCategoria: (req, res) => {
        res.render('criarCategoria');
    },
    salvarCategoria: async function (req, res) {
        const { nome, descricao } = req.body;
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarCategoria', { errors });
        }

        await db.Categoria.create({
            nome,
            descricao
        })

        res.render("listarCategorias");
    },
    listar: (req, res) => {
        db.Categoria.findAll().then(categorias => {
            res.render('listarCategorias', { categorias })
        });
    }
}

module.exports = categoriaController;