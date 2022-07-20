const db = require("../models");
const { validationResult } = require("express-validator");
const id = require("faker-br/lib/locales/id_ID");


const produtoController = {

    carrinho: (req, res) => {
        res.render('carrinho');
    },
    produto: (req, res) => {
        res.render('produto');
    },
    criar: (req, res) => {
        db.Genero.findAll().then(generos => {
            res.render('cadastroProduto', { generos });
        });
    },
    salvar: async (req, res) => {

        const produto = req.body;
        console.log(produto);
        const errors = validationResult(req);

        if (!errors.isEmpty()) { // ainda nao está validando
            console.log(errors);
            return res.render('cadastroProduto', { errors });
        }

        await db.Produto.create({
            nome: produto.nome,
            descricao: produto.descricao,
            avaliacao: parseFloat(produto.avaliacao),
            preco: parseFloat(produto.preco),
            genero_id: parseInt(produto.genero_id),
            foto_livro: req.file.filename
        }/*, {
            include: ["genero"]
            relação muitos para muitos
        }*/ )

        res.redirect("/produto/lista");
    },
    editar: (req, res) => {

    },
    atualizar: (req, res) => {

    },
    deletar: (req, res) => {

    },
    exibir: async (req, res) => {
        const idLivro = req.params.id;
        console.log(idLivro);
        const livro = await db.Produto.findByPk(parseInt(idLivro),{ include: ["genero"]})

        res.render('produto',{ livro });
    },
    listar: (req, res) => {
        db.Produto.findAll({ include: ["genero"]}).then(livros => {
            res.render('listarProdutos', { livros })
        });
    
        //res.render("listarProdutos");
    },


}



module.exports = produtoController;