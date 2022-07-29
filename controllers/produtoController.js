const db = require("../models");
const { validationResult } = require("express-validator");
const id = require("faker-br/lib/locales/id_ID");
const fs = require("fs");

const produtoController = {

    carrinho: (req, res) => {
        res.render('carrinho');
    },
    produto: (req, res) => {
        res.render('produto');
    },
    criar: async (req, res) => {
        const generos = await db.Genero.findAll()
        const produto = {}
        res.render('cadastroProduto', {
            generos: generos,
            Produto: produto,
            titulo: 'Criar',
            actionUrl: "/produto/salvar"
        });

    },
    salvar: async (req, res) => {

        const produto = req.body;
        console.log(produto);
        const errors = validationResult(req);

        if (!errors.isEmpty()) { // ainda nao está validando !!!!!!!!!
            console.log(errors);
            return res.render('cadastroProduto', { errors });
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
        }/*, {
            include: ["genero"]
             
        }*/ )

        res.redirect("/produto");
    },
    editar: async (req, res) => {
        const generos = await db.Genero.findAll();
        const idProduto = req.params.id;

        const produto = await db.Produto.findByPk(idProduto, { include: ["genero"] })

        res.render('cadastroProduto', { 
            Produto: produto, 
            generos: generos,
            titulo: 'Editar',
            actionUrl: "/produto/editar/" + idProduto
         });
    },
    atualizar: async (req, res) => {
        const idProduto = req.params.id;
        const produto = req.body;
        console.log(produto);
        const errors = validationResult(req);

        if (!errors.isEmpty()) { // ainda nao está validando !!!!!!!!!
            console.log(errors);
            return res.render('cadastroProduto', { errors });
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
    deletar: async (req, res) => {
        const idProduto = req.params.id;
        const produtoEncontrado = await db.Produto.findByPk(idProduto);

        fs.unlinkSync('public/uploads/fotos_produtos/' + produtoEncontrado.foto_livro);

        await db.Produto.destroy({ 
            where: {
              id: idProduto
            }
          });
        res.redirect('/produto')
    },
    exibir: async (req, res) => {
        const idLivro = req.params.id;

        const livro = await db.Produto.findByPk(idLivro, { include: ["genero"] })

        res.render('produto', { livro });
    },
    listar: (req, res) => {
        db.Produto.findAll({ include: ["genero"] }).then(livros => {
            res.render('listarProdutos', { livros })
        });

        //res.render("listarProdutos");
    },


}



module.exports = produtoController;