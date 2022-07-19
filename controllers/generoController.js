const db = require("../models");
const { validationResult } = require("express-validator");


const generoController = {

    criar: async(req, res) => {
        res.render('criarGenero',);
    },
    salvar: async function (req, res) {
        const { nome, descricao } = req.body;
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarGenero', { errors });
        }

        await db.Genero.create({
            nome,
            descricao
        })

        res.redirect("/genero");
    },
    listar: (req, res) => {
        db.Genero.findAll().then(generos => {
            res.render('listarGeneros', { generos })
        });
    },
    editar: async (req, res) =>{
        const idGenero = req.params.id;
        console.log(idGenero);
        const genero = await db.Genero.findByPk(parseInt(idGenero));
        res.render('editarGenero', { Genero: genero });
    },
    atualizar: async function (req, res) {
        const idGenero = req.params;
        const errors = validationResult(req);
        const { nome, descricao } = req.body;

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarGenero', { errors });
        }
        
        await db.Genero.update({ 
            nome: nome,
            descricao: descricao
        }, {
            where: {
              id: parseInt(idGenero.id)
            }
          });
        res.redirect("/genero");
    },
    deletar: async (req,res) =>{
        const idGenero = req.params.id;

        
        await db.Genero.destroy({ 
            where: {
              id: parseInt(idGenero)
            }
          });
        res.redirect("/genero");
    }    
}

module.exports = generoController;