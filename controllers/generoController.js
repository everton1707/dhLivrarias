const db = require("../models");
const { validationResult } = require("express-validator");
const fs = require("fs");

const generoController = {

    criar: async(req, res) => {
        const genero = {};
        res.render('criarGenero',{ 
            Genero: genero,
            titulo: 'Criar',
            actionUrl: "/genero/salvar"
        });
    },
    salvar: async function (req, res) {
        const { nome, descricao } = req.body;
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarGenero', { errors });
        }

        await db.Genero.create({
            nome,
            descricao,
            foto_genero: req.file.filename
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
        const genero = await db.Genero.findByPk(idGenero);
        res.render('criarGenero', { 
            Genero: genero,
            titulo: 'Editar',
            actionUrl: "/genero/editar/" + idGenero
         });
    },
    atualizar: async function (req, res) {
        const idGenero = req.params.id;
        const errors = validationResult(req);
        const { nome, descricao } = req.body;

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarGenero', { errors });
        }
        const generoEncontrado = await db.Genero.findByPk(idGenero);

        fs.unlinkSync('public/uploads/fotos_generos/' + generoEncontrado.foto_genero);
        await db.Genero.update({ 
            nome: nome,
            descricao: descricao,
            foto_genero: req.file.filename
        }, {
            where: {
              id: idGenero
            }
          });
        res.redirect("/genero");
    },
    deletar: async (req,res) =>{
        const idGenero = req.params.id;

        const produtosDeletados = await db.Produto.findAll ({ where: { genero_id: idGenero }})//apagar imagens tambem !!!!
        await db.Produto.destroy({ where: { genero_id: idGenero }})//apagar imagens tambem !!!!

        for(var i = 0 ; i<produtosDeletados.length;i++){
            fs.unlinkSync('public/uploads/fotos_produtos/' + produtosDeletados[i].foto_livro);
        }

        const generoEncontrado = await db.Genero.findByPk(idGenero);
        fs.unlinkSync('public/uploads/fotos_generos/' + generoEncontrado.foto_genero);
        await db.Genero.destroy({ 
            where: {
              id: idGenero
            }
          });
        res.redirect("/genero");
    }    
}

module.exports = generoController;