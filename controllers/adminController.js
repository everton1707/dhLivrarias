const db = require("../models");
const fs = require("fs");
const { validationResult } = require("express-validator");

const adminController = {
    
    produtoCriar: async (req, res) => {
        const generos = await db.Genero.findAll()
        const produto = {}
        const Admin = req.session.admin;
        res.render('cadastroProduto', {
            generos: generos,
            Produto: produto,
            titulo: 'Criar',
            actionUrl: "/admin/produto/salvar",
            Admin
        });

    },
    produtoSalvar: async (req, res) => {

        const produto = req.body;
        console.log(produto);
        const errors = validationResult(req);

        if (!errors.isEmpty()) { // ainda nao está validando !!!!!!!!!
            console.log(errors);
            const Admin = req.session.admin;
            return res.render('cadastroProduto', { errors, Admin });
        }

        await db.Produto.create({
            nome: produto.nome,
            descricao: produto.descricao,
            autor: produto.autor,
            editora: produto.editora,
            avaliacao: parseFloat(produto.avaliacao),
            preco: parseFloat(produto.preco),
            genero_id: parseInt(produto.genero_id),
            foto_livro: req.file.filename
        })

        res.redirect("/produto");
    },
    produtoEditar: async (req, res) => {
        const generos = await db.Genero.findAll();
        const idProduto = req.params.id;
        const Admin = req.session.admin;

        const produto = await db.Produto.findByPk(idProduto, { include: ["genero"] })

        res.render('cadastroProduto', { 
            Produto: produto, 
            generos: generos,
            titulo: 'Editar',
            actionUrl: "/admin/produto/editar/" + idProduto,
            Admin
         });
    },
    produtoAtualizar: async (req, res) => {
        const idProduto = req.params.id;
        const produto = req.body;
        const errors = validationResult(req);
        const Admin = req.session.admin;

        if (!errors.isEmpty()) { // ainda nao está validando !!!!!!!!!
            console.log(errors);
            return res.render('cadastroProduto', { errors, Admin });
        }

        const produtoEncontrado = await db.Produto.findByPk(idProduto);

        fs.unlinkSync('public/uploads/fotos_produtos/' + produtoEncontrado.foto_livro);
        
        await db.Produto.update({
            nome: produto.nome,
            descricao: produto.descricao,
            autor: produto.autor,
            editora: produto.editora,
            avaliacao: parseFloat(produto.avaliacao),
            preco: parseFloat(produto.preco),
            genero_id: parseInt(produto.genero_id),
            foto_livro: req.file.filename
        }, {
            where:{
                id: idProduto
            }
        })

        res.redirect("/produto");

       
    },
    produtoDeletar: async (req, res) => {
        const idProduto = req.params.id;
        const produtoEncontrado = await db.Produto.findByPk(idProduto)
        const Admin = req.session.admin;
        const pedidos = await db.Pedido_has_produto.findAll({
            where:{
                produto_id: idProduto
            }
        })
        console.log(pedidos)
        if (pedidos.length > 0){
            const msgErro = "Há pedidos vinculados a este produto!";
            res.render("telaErro", { msgErro, Admin });
        }else{

            fs.unlinkSync('public/uploads/fotos_produtos/' + produtoEncontrado.foto_livro);
            
            await db.Produto.destroy({ 
                where: {
                    id: idProduto
                }
            });
            res.redirect('/produto')
        }
    },




}

module.exports = adminController;