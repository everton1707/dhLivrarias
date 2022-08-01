const db = require("../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const adminController = {
    login: (req, res) => {
        res.render('login');
    },

    acaoLogin: async (req, res) => {
        const body = {
            email: req.body.email,
            senha: req.body.senha
        }

        // busca do usuario digitado no banco

        const adminEncontrado = await db.Cliente.findOne({ where: { email: body.email } });
        console.log(adminEncontrado);
        if (adminEncontrado == null) {
            return res.render('usuario/login'); // ver rota 
        }

        // verificacao de login 

        const resultadoSenha = bcrypt.compareSync(body.senha, adminEncontrado.senha);
        if (!resultadoSenha) {
            return req.render('login');
        }
        req.session.idUsuario = adminEncontrado.id;
        req.session.nome = adminEncontrado.nome;
        req.session.sobrenome = adminEncontrado.sobrenome;
        req.session.email = adminEncontrado.email;
        req.session.foto_perfil = adminEncontrado.foto_perfil;

        const adminLogado = req.session;
        res.render('painelUsuario', { adminLogado });
    },
    admin: (req, res) => {
        const adminLogado = req.session;

        console.log(adminLogado);


        res.render('painelUsuario', { adminLogado });
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
        res.render('cadastroAdmin', {
            Cliente,
            titulo: 'Cadastrar',
            actionUrl: "/usuario/cadastrar/"
        });
    },
    acaoCadastrar: async (req, res) => {

        const { nome, sobrenome, email, senha } = req.body;
        const errors = validationResult(req); //importa os erros da validação feita no middleware
        if (!errors.isEmpty()) {

            return res.render('cadastroAdmin', {
                email,
                nome,
                sobrenome,
                errors: errors.array()
            });//obs voltando para mesma pagina e passando como segundo parametro um objeto contando um array com os erros
        }

        await db.Admin.create({ //--- igual a um create no mysql
            email, 
            nome,
            sobrenome,
            senha: bcrypt.hashSync(senha),
            foto_perfil: req.file.filename
        })


        res.redirect('/usuario/login');
    },
    cadastroEndereco: (req, res) => {
        res.render('cadastroEndereco');
    },
    editar: async (req, res) => {
        const idCliente = req.session.idAdmin;
        const cliente = await db.Admin.findByPk(idAdmin);
        res.render('cadastroAdmin', {
            Cliente: cliente,
            titulo: 'Editar',
            actionUrl: "/usuario/editar/"
        });
    },
    atualizar: async (req, res) => {
        const { nome, sobrenome, email, senha } = req.body;
        const errors = validationResult(req);
        const idAdmin = req.session.idUsuario;

        if (!errors.isEmpty()) {
            console.log(errors);
            fs.unlinkSync('public/uploads/fotos_perfil/' + req.file.filename);
            return res.render('criarAdmin', { errors });
        }
        const adminEncontrado = await db.Cliente.findByPk(idCliente);
        fs.unlinkSync('public/uploads/fotos_perfil/' + usuarioEncontrado.foto_perfil);
        await db.Cliente.update({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: bcrypt.hashSync(senha),
            foto_perfil: req.file.filename
        }, {
            where: {
                id: idCliente
            }
        });
        req.session.idAdmin = adminEncontrado.id;
        req.session.nome = nome;
        req.session.sobrenome = sobrenome;
        req.session.email = email;
        req.session.foto_perfil = req.file.filename;
        res.redirect("/usuario");
    },
    deletar: async (req, res) => {
        const idCliente = req.session.idAdmin;

        const adminEncontrado = await db.Cliente.findByPk(idCliente);
        fs.unlinkSync('public/uploads/fotos_perfil/' + adminEncontrado.foto_perfil);
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

module.exports = adminController;