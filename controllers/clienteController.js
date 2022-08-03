const db = require("../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const clienteController = {
    login: (req, res) => {
        const Admin = req.session.admin;
        res.render('login',{Admin});
    },

    acaoLogin: async (req, res) => {
        const body = {
            email: req.body.email,
            senha: req.body.senha
        }
        var Admin = req.session.admin;
        // busca do usuario digitado no banco

        const usuarioEncontrado = await db.Cliente.findOne({ where: { email: body.email } });
        console.log(usuarioEncontrado);
        if (usuarioEncontrado == null) {
            return res.render('usuario/login',{Admin});
        }

        // verificacao de login 

        const resultadoSenha = bcrypt.compareSync(body.senha, usuarioEncontrado.senha);
        if (!resultadoSenha) {
            return req.render('login',{Admin});
        }
        req.session.idUsuario = usuarioEncontrado.id;
        req.session.nome = usuarioEncontrado.nome;
        req.session.sobrenome = usuarioEncontrado.sobrenome;
        req.session.email = usuarioEncontrado.email;
        req.session.admin = usuarioEncontrado.admin;
        Admin = req.session.admin;
        req.session.foto_perfil = usuarioEncontrado.foto_perfil;

        const usuarioLogado = req.session;
        res.render('painelUsuario', { usuarioLogado, Admin });
    },
    usuario: (req, res) => {
        const usuarioLogado = req.session;
        Admin = req.session.admin;

        res.render('painelUsuario', { usuarioLogado, Admin });
    },
    logout: function (req, res) {
        req.session.user = null
        req.session.save(function (err) {
            if (err) next(err)
            req.session.regenerate(function (err) {
                if (err) next(err)
    
                res.redirect('/')
            })
        })
    },
    cadastrar: (req, res) => {
        const Cliente = {}
        const Admin = req.session.admin;


        res.render('cadastroCliente', {
            Cliente,
            titulo: 'Cadastrar',
            actionUrl: "/usuario/cadastrar/",
            Admin
        });
    },
    acaoCadastrar: async (req, res) => {

        const { nome, sobrenome, email, senha, admin } = req.body;

        const Admin = req.session.admin;
        const errors = validationResult(req); //importa os erros da validação feita no middleware
        if (!errors.isEmpty()) {
            
            return res.render('cadastroCliente', {
                email,
                nome,
                sobrenome,
                Admin,
                errors: errors.array()
            });//obs voltando para mesma pagina e passando como segundo parametro um objeto contando um array com os erros
        }



        await db.Cliente.create({ //--- igual a um create no mysql
            email,
            nome,
            sobrenome,
            senha: bcrypt.hashSync(senha),
            admin,
            foto_perfil: req.file.filename
        })


        res.redirect('/usuario/login');
    },
    editar: async (req, res) => {
        const idCliente = req.session.idUsuario;
        const Admin = req.session.admin;
        const cliente = await db.Cliente.findByPk(idCliente);
        res.render('cadastroCliente', {
            Cliente: cliente,
            titulo: 'Editar',
            actionUrl: "/usuario/editar/",
            Admin
        });
    },
    atualizar: async (req, res) => {
        const { nome, sobrenome, email, senha, admin } = req.body;
        const errors = validationResult(req);
        const idCliente = req.session.idUsuario;
        const Admin = req.session.admin;

        if (!errors.isEmpty()) {
            console.log(errors);
            fs.unlinkSync('public/uploads/fotos_perfil/' + req.file.filename);
            return res.render('criarCliente', { errors, Admin });
        }
        const usuarioEncontrado = await db.Cliente.findByPk(idCliente);
        fs.unlinkSync('public/uploads/fotos_perfil/' + usuarioEncontrado.foto_perfil);
        await db.Cliente.update({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: bcrypt.hashSync(senha),
            admin: admin,
            foto_perfil: req.file.filename
        }, {
            where: {
                id: idCliente
            }
        });
        req.session.idUsuario = usuarioEncontrado.id;
        req.session.nome = nome;
        req.session.sobrenome = sobrenome;
        req.session.email = email;
        req.session.foto_perfil = req.file.filename;
        res.redirect("/usuario", {Admin});
    },
    deletar: async (req, res) => {
        const idCliente = req.session.idUsuario;

        const usuarioEncontrado = await db.Cliente.findByPk(idCliente);
        fs.unlinkSync('public/uploads/fotos_perfil/' + usuarioEncontrado.foto_perfil);
        //await db.Produto.destroy({ where: { genero_id: idCliente }})  //fazer com enderecos
        await db.Cliente.destroy({
            where: {
                id: idCliente
            }
        });
        req.session.user = null
        req.session.save(function (err) {
            if (err) next(err)
            req.session.regenerate(function (err) {
                if (err) next(err)
                res.redirect('/')
            })
        })
        res.redirect("/");
    }

}

module.exports = clienteController;