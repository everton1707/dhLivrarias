const db = require("../models");
const { validationResult } = require("express-validator");


const categoriaController = {

    criar: async(req, res) => {
        res.render('criarCategoria',);
    },
    salvar: async function (req, res) {
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

        res.redirect("/categoria");
    },
    listar: (req, res) => {
        db.Categoria.findAll().then(categorias => {
            res.render('listarCategorias', { categorias })
        });
    },
    editar: async (req, res) =>{
        const idCategoria = req.params.id;
        console.log(idCategoria);
        const categoria = await db.Categoria.findByPk(parseInt(idCategoria));
        res.render('editarCategoria', { Categoria:categoria });
    },
    atualizar: async function (req, res) {
        const idCategoria = req.params;
        const errors = validationResult(req);
        const { nome, descricao } = req.body;

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarCategoria', { errors });
        }
        
        await db.Categoria.update({ 
            nome: nome,
            descricao: descricao
        }, {
            where: {
              id: parseInt(idCategoria.id)
            }
          });
        res.redirect("/categoria");
    },
    deletar: async (req,res) =>{
        const idCategoria = req.params.id;

        
        await db.Categoria.destroy({ 
            where: {
              id: parseInt(idCategoria)
            }
          });
        res.redirect("/categoria");
    }    
}

module.exports = categoriaController;