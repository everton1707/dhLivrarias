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
        db.Genero.findAll().then(generos => {
            res.render('cadastroProduto', { generos });
        });
    },
    salvar: async (req, res) => {
        const { nome, descricao, avaliacao, preco, genero_id } = req.body;
        
        
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
            genero_id: parseInt(produto.genero_id),
            //foto_perfil: req.file.fileName
        })

        res.send("produto salvo!");
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
        /*db.Produto.findAll().then(produtos => {
            res.render('listarProdutos', { produtos })
        });*/
        res.render("listarProdutos");
    },
    

}



module.exports = produtoController;