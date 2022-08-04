const db = require("../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { Op } = require("sequelize");
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
        
        if (usuarioEncontrado == null) {
            return res.render('login',{Admin});
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
        req.session.foto_perfil = usuarioEncontrado.foto_perfil;

        res.redirect('/usuario');
    },
    usuario: async (req, res) => {
        const usuarioLogado = req.session;
        Admin = req.session.admin;
        var pedidos = [];
        pedidos = await db.Pedido.findAll({
            where: {
                cliente_id: usuarioLogado.idUsuario,
                data_entrega: {
                    [Op.not]: null
                  }
            }
        })
        //console.log(pedidos);
        const pedidosIds = [];
        for(i=0; i<pedidos.length;i++){
            pedidosIds.push(pedidos[i].id);
        }
        console.log(pedidosIds)
        const pedidosHasProduto = await db.Pedido_has_produto.findAll({
            where:{
                pedido_id: pedidosIds
            }
        })
        


        const produtosIds = [];
        for(i=0; i<pedidosHasProduto.length;i++){
            produtosIds.push(pedidosHasProduto[i].produto_id);
        }


        const produtos = await db.Produto.findAll({
            where:{
                id: produtosIds
            }
        })

        res.render('painelUsuario', { 
            usuarioLogado, 
            Admin,
            pedidos,
            pedidosHasProduto,
            produtos
        });
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

        const Cliente = req.body;

        const Admin = req.session.admin;
        const errors = validationResult(req); //importa os erros da validação feita no middleware
        if (!errors.isEmpty()) {
            console.log(errors.array())
            fs.unlinkSync('public/uploads/fotos_perfil/' + req.file.filename);
            return res.render('cadastroCliente', {
                Cliente,
                Admin,
                titulo: 'Cadastrar',
                actionUrl: "/usuario/cadastrar/",
                errors: errors.array()
            });//obs voltando para mesma pagina e passando como segundo parametro um objeto contando um array com os erros
        }



        await db.Cliente.create({ //--- igual a um create no mysql
            email: Cliente.email,
            nome: Cliente.nome,
            sobrenome: Cliente.sobrenome,
            senha: bcrypt.hashSync(Cliente.senha),
            admin: Cliente.admin,
            foto_perfil: req.file.filename
        })


        res.render('login',{Admin});
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
        const Cliente = req.body;
        const errors = validationResult(req);
        const idCliente = req.session.idUsuario;
        const Admin = req.session.admin;

        if (!errors.isEmpty()) {
            console.log(errors);
            fs.unlinkSync('public/uploads/fotos_perfil/' + req.file.filename);
            return res.render('cadastroCliente', {
                Cliente,
                Admin,
                titulo: 'Cadastrar',
                actionUrl: "/usuario/cadastrar/",
                errors: errors.array()
            });
        }
        const usuarioEncontrado = await db.Cliente.findByPk(idCliente);
        fs.unlinkSync('public/uploads/fotos_perfil/' + usuarioEncontrado.foto_perfil);
        await db.Cliente.update({ //--- igual a um create no mysql
            email: Cliente.email,
            nome: Cliente.nome,
            sobrenome: Cliente.sobrenome,
            senha: bcrypt.hashSync(Cliente.senha),
            admin: Cliente.admin,
            foto_perfil: req.file.filename
        }, {
            where: {
                id: idCliente
            }
        });
        req.session.idUsuario = usuarioEncontrado.id;
        req.session.nome = Cliente.nome;
        req.session.sobrenome = Cliente.sobrenome;
        req.session.email = Cliente.email;
        req.session.foto_perfil = req.file.filename;
        res.redirect("/usuario");
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