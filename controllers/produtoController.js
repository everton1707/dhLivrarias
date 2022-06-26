const db = require("../models");
const { validationResult } = require("express-validator");
const sequelize = db.sequelize;




const produtoController = {
    index: (req, res) => {
        res.render('home');
    },
    faleConosco: (req, res) => {
        res.render('faleConosco');
    },
    
    login: (req, res) => {
        //let prato = listaPratos.find(prato => prato.id == req.params.id);
        res.render('login');
    },
    cadastro: (req, res) => {
        res.render('cadastroCliente');
    },
    finalizacao: (req, res) => {
        res.render('finalizacao');
    },
    cadastroEndereco:(req, res)=>{
        res.render('cadastroEndereco');
    },
    checkout: (req, res) => {
        res.render('checkout');
    },
    carrinho: (req, res) => {
        res.render('carrinho');
    },
    produto: (req, res) => {
        res.render('produto');
    },
    criarCategoria: (req, res) => {
        res.render('criarCategoria');
    },
    salvarCategoria: function (req, res) {
        const errors = validationResult(req);
        /*db.categoria.create({
            nome: nome,
            descricao: descricao
        }).then(()=>{
            res.redirect('/listarCategoria');
        }).catch(()=>{
            console.log(errors);
        })*/

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarCategoria', { errors });
        } else {
            const body = {
                nome: req.body.nome,
                descricao: req.body.descricao
            }
            categoria.push(body);
            console.log(categoria);
            res.render('faleConosco');
        }


    }
    

}



module.exports = produtoController;