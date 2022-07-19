const db = require("../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const clienteController = {
    login: (req, res) => {
        res.render('login');
    },

    logar: async (req, res) => {
        const body = {
            email: req.body.email,
            senha: req.body.senha
        }

        // fazer busca do usuario digitado no banco
        const usuarioEncontrado = await db.Cliente.findOne({ where: { email: body.email } });
        console.log(usuarioEncontrado);
        if (usuarioEncontrado == null) {
            return res.render('usuario/login', { email });
        }
        //verificacao de login 

        const resultadoSenha = bcrypt.compareSync(body.senha, usuarioEncontrado.senha);
        if (!resultadoSenha) {
            return req.render('login', { email });
        }
        req.session.idUsuario = usuarioEncontrado.id;
        req.session.nome = usuarioEncontrado.nome;
        req.session.sobrenome = usuarioEncontrado.sobrenome;
        req.session.email = usuarioEncontrado.email;
        req.session.foto_perfil = usuarioEncontrado.foto_perfil;


        res.render('painelUsuario', req.session);



    },
    usuario: (req, res) => {
        const usuarioLogado = req.session;

        console.log(usuarioLogado);


        res.render('painelUsuario', {usuarioLogado});
    },
    listarCategorias: (req, res) => {
        res.render('listarCategorias');
    },
    logout: function (req, res) {

        req.session.user = null
        req.session.save(function (err) {
            if (err) next(err)

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) next(err)
                res.redirect('/')
            })
        })
        /*req.session.destroy();
        res.redirect("/");*/
    },
    cadastro: (req, res) => {
        res.render('cadastroCliente');
    },
    acaoCadastro: async (req, res) => {

        const { nome, sobrenome, email, senha } = req.body;
        const errors = validationResult(req); //importa os erros da validação feita no middleware
        if (!errors.isEmpty()) {

            return res.render('cadastroCliente', {
                email,
                nome,
                sobrenome,
                errors: errors.array()
            });//obs voltando para mesma pagina e passando como segundo parametro um objeto contando um array com os erros
        }


        console.log(req.file);//teste nome da foto
        await db.Cliente.create({ //--- igual a um create no mysql
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



}

module.exports = clienteController;


