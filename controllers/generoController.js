const db = require("../models");
const { validationResult } = require("express-validator");
const fs = require("fs");

const generoController = {

    criar: async(req, res) => {
        const Admin = req.session.admin;
        const genero = {};
        res.render('criarGenero',{ 
            Genero: genero,
            titulo: 'Criar',
            actionUrl: "/admin/genero/salvar",
            Admin
        });
    },
    salvar: async function (req, res) {
        const { nome, descricao } = req.body;
        const errors = validationResult(req);
        const Admin = req.session.admin;


        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarGenero', { errors, Admin });
        }

        await db.Genero.create({
            nome,
            descricao,
            foto_genero: req.file.filename
        })

        res.redirect("/admin/genero");
    },
    listar: (req, res) => {
        const Admin = req.session.admin;
        db.Genero.findAll().then(generos => {
            res.render('listarGeneros', { generos, Admin})
        });
    },
    editar: async (req, res) =>{
        const Admin = req.session.admin;
        const idGenero = req.params.id;
        const genero = await db.Genero.findByPk(idGenero);
        res.render('criarGenero', { 
            Genero: genero,
            titulo: 'Editar',
            actionUrl: "/admin/genero/editar/" + idGenero,
            Admin
         });
    },
    atualizar: async function (req, res) {
        const Admin = req.session.admin;
        const idGenero = req.params.id;
        const errors = validationResult(req);
        const { nome, descricao } = req.body;

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarGenero', { errors, Admin });
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
        res.redirect("/admin/genero");
    },
    deletar: async (req,res) =>{
        const idGenero = req.params.id;
        const produtosRelacionados = await db.Produto.findAll ({ where: { genero_id: idGenero }})
        

        if(produtosRelacionados.length > 0){
            const msgErro = "Existem produtos relacionados a esse gênero";
            res.render("telaErro", { msgErro, Admin })
            return;
        }

        const generoEncontrado = await db.Genero.findByPk(idGenero);
        console.log(generoEncontrado)
        fs.unlinkSync('public/uploads/fotos_generos/' + generoEncontrado.foto_genero);
        await db.Genero.destroy({ 
            where: {
              id: idGenero
            }
          });
        res.redirect("/admin/genero");
    }    
}

module.exports = generoController;