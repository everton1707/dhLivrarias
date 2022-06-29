const db = require("../models");
const { validationResult } = require("express-validator");
const sequelize = db.sequelize;
const bcrypt = require("bcryptjs");

const clienteController = {
    logar: async (req, res, next) => {
        const body = {
            email: req.body.email,
            senha: req.body.senha
        }
        // fazer busca do usuario digitado no banco
        const usuarioEncontrado = await db.Usuario.findOne({ where: { email: email }});

        if(usuarioEncontrado == null){
            return res.render("/login", { email });
        }
            //verificacao de login //precisa criptografar senha
            if (acesso.email == body.email && acesso == body.senha) {
                req.session.email = body.email;
                req.session.nome = acesso.nome;


                res.render('painelUsuario');
            } else {
                res.render('login');
            }


    },
    usuario: (req, res) => {
        res.render('painelUsuario');
    },
    listarCategorias: (req, res) => {
        res.render('listarCategorias');
    },  
    /*

    acaoLogin: async function(req, res){
        const { email, senha } = req.body;
        const usuarioEncontrado = await db.Usuario.findOne({ where: { email: email }});
        
        if(usuarioEncontrado == null){
            return res.render("/login", { email });
        }
    },
    */
    logout: function(req, res){
        req.session.destroy();
        res.redirect("/");
    },
    cadastro: (req, res) => {
        res.render('cadastroCliente');
    },
    acaoCadastro:(req, res) =>{
        console.log(req.body)
        const { nome, sobrenome, email, senha }= req.body;
        db.Cliente.create({ //--- igual a um create no mysql
            email,
            nome,
            sobrenome,
            senha: bcrypt.hashSync(senha),
            foto_perfil: req.file.filename
        })



    }


}

module.exports = clienteController;