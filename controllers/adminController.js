const db = require("../models");
const { validationResult } = require("express-validator");
const sequelize = db.sequelize;


const AdminController = {
    logar: (req, res, next) => {
        const body = {
            email: req.body.email,
            senha: req.body.senha
        }


        db.Cliente.findOne().then(() => { // fazer busca do usuario digitado no banco

            //verificacao de login //precisa criptografar senha
            if (acesso.email == body.email && acessoBusa == body.senha) {
                req.session.email = body.email;
                req.session.nome = acesso.nome;


                res.render('painelUsuario');
            } else {
                res.render('login');
            }
        }).catch()

    },
    usuario: (req, res) => {
        res.render('painelUsuario');
    },
    listarCategorias: (req, res) => {
        res.render('listarCategorias');
    /*
        login: function(req, res){
        res.render("login");
    },
    acaoLogin: async function(req, res){
        const { email, senha } = req.body;
        const usuarioEncontrado = await db.Usuario.findOne({ where: { email: email }});
        
        if(usuarioEncontrado == null){
            return res.render("/login", { email });
        }
    },
    logout: function(req, res){
        req.session.destroy();
        res.redirect("/");
    }
    */
    }


}

module.exports = AdminController;