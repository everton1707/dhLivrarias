const db = require("../models");
const { validationResult } = require("express-validator");


const produtoController = {
    
    carrinho: (req, res) => {
        res.render('carrinho');
    },
    produto: (req, res) => {
        res.render('produto');
    },
    criar: (req, res)=> {
        db.Categoria.findAll().then(categorias => {
            res.render('cadastroProduto', { categorias });
        });
    },
    salvar: async (req, res) => {
        //const { nome, descricao, avaliacao, preco, categoria_id } = req.body;
        const produto = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) { // ainda nao está validando
            console.log(errors);
            return res.render('cadastroProduto', { errors });
        }

        await db.Produto.create({
            nome: produto.nome,
            descricao: produto.descricao,
            avaliacao: produto.avaliacao,
            preco: produto.preco,
            categoria_id: parseInt(produto.categoria_id),
        })

        res.send(produto);
    },
    editar:(req, res)=>{

    },
    atualizar: (req, res)=>{

    },
    deletar:(req,res)=>{

    },
    exibir: (req,res)=>{

    },
    listar: (req,res)=>{
        db.Produto.findAll().then(produtos => {
            res.render('listarProdutos', { produtos })
        });
        //res.render("listarProdutos");
    },
    

}



module.exports = produtoController;