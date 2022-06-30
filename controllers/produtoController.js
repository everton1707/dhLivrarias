const db = require("../models");
const { validationResult } = require("express-validator");
const sequelize = db.sequelize;


const acesso = {
    email: 'dh@gmail.com',
    senha: '12345',
    nome: 'Everton'
}
let categoria = [];
const produtoController = {
    index:(req, res)=>{
        res.render('home');
    },
    faleConosco:(req, res)=>{
        res.render('faleConosco');
    },
    usuario:(req, res)=>{
        res.render('painelUsuario');
    },
    login:(req, res)=>{
        //let prato = listaPratos.find(prato => prato.id == req.params.id);
        res.render('login');
    },
    cadastro:(req, res)=>{
        res.render('cadastroCliente');
    },
    cadastroEndereco:(req, res)=>{
        res.render('cadastroEndereco');
    },
    finalizacao:(req, res)=>{
        res.render('finalizacao');
    }, 
     checkout:(req, res)=>{
        res.render('checkout');
    },
    carrinho:(req, res)=>{
        res.render('carrinho');
    }, 
     produto:(req, res)=>{
        res.render('produto');
    },
    criarCategoria:(req, res)=>{
        res.render('criarCategoria');
    },
    cadastroProduto:(req, res)=>{
        res.render('cadastroProduto');
    },
    salvarCategoria:function (req, res){
        const errors = validationResult(req);
        /*db.categoria.create({
            nome: nome,
            descricao: descricao
        }).then(()=>{
            res.redirect('/criarCategoria');
        }).catch(()=>{
            console.log(errors);
        })*/

        if (!errors.isEmpty()){
            console.log(errors);
            return res.render('criarCategoria', {errors});
        }else{
            const body = {
                nome: req.body.nome,
                descricao: req.body.descricao
            }
            categoria.push(body);
            console.log(categoria);
            res.render('faleConosco');
        }

    
    },
    logar: (req, res,next)=>{
        const body = {
            email: req.body.email,
            senha: req.body.senha
        }

        if(acesso.email == body.email && acesso.senha == body.senha){
            //req.session.email = body.email;
            //req.session.nome = acesso.nome;


            res.render('painelUsuario');
        }else{
            res.render('login');
        }
         
    }

 }
 


module.exports = produtoController;