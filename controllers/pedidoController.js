const { Op } = require("sequelize");
const db = require('../models');


const pedidoController = {
    exibir: async (req, res) => {
        const Admin = req.session.admin;
        var pedido = await db.Pedido.findOne({
            where: {
                cliente_id: req.session.idUsuario,
                data_entrega: null,

            }

        })


        if (pedido == null) {
            pedido = await db.Pedido.create({
                data: new Date(),
                valor: 0,
                avaliacao: 0,
                cliente_id: req.session.idUsuario
            })
        }

        const pedidoHasProduto = await db.Pedido_has_produto.findAll({
            where: {
                pedido_id: pedido.id
            }
        })



        let produtosIds = [];
        for (i = 0; i < pedidoHasProduto.length; i++) {
            produtosIds.push(pedidoHasProduto[i].produto_id);
        }

        const produtos = await db.Produto.findAll({
            where: {
                id: produtosIds
            }
        })
        var valorPedido = 0;
        for (i = 0; i < produtos.length; i++) {
            for (k = 0; k < pedidoHasProduto.length; k++) {               
                if (produtos[i].id == pedidoHasProduto[k].produto_id) {
                    valorPedido = (produtos[i].preco * pedidoHasProduto[k].quantidade) + valorPedido;                
                }
            }
        }
        await db.Pedido.update({
            valor: valorPedido
        }, {
            where: {
                id: pedido.id
            }
        })
        pedido.valor = valorPedido;
        res.render("carrinho", { pedido, pedidoHasProduto, produtos, Admin });

    },
    adicionar: async (req, res) => {
        const idProduto = req.params.id;
        const produto = await db.Produto.findByPk(idProduto);
        const quantidade = req.body.quantidade;
        var pedido = await db.Pedido.findOne({
            where: {
                cliente_id: req.session.idUsuario,
                data_entrega: null
            }
        })
        if (pedido == null) {
            // criando novo pedido
            pedido = await db.Pedido.create({
                data: new Date(),
                cliente_id: req.session.idUsuario
            })

        }
        const resultado = await db.Pedido_has_produto.findOne({
            where: {
                pedido_id: pedido.id,
                produto_id: produto.id,
            }
        })


        if (resultado == null) {

            await db.Pedido_has_produto.create({
                pedido_id: pedido.id,
                produto_id: produto.id,
                quantidade: parseInt(quantidade),
                valor: produto.preco
            });

        } else {
            await db.Pedido_has_produto.update({
                quantidade: parseInt(quantidade),
            }, {
                where: {
                    pedido_id: pedido.id,
                    produto_id: produto.id,
                }
            });

        }


        res.redirect('/carrinho');
    },
    removerItem: async (req, res) => {
        const idProduto = req.params.id;

        const pedido = await db.Pedido.findOne({
            where: {
                cliente_id: req.session.idUsuario,
                data_entrega: null,

            }})
        await db.Pedido_has_produto.destroy({
            where: {
                pedido_id: pedido.id,
                produto_id: idProduto
            }
        })


        res.redirect('/carrinho');
    },
    pagamento: async (req, res) => {
        const Admin = req.session.admin;
        const pedido = await db.Pedido.findOne({
            where: {
                id: req.params.id
            },
            include: ["produtos", "cliente"]
        })

        if (pedido.cliente_id != req.session.idUsuario) {
            const msgErro = "Acesso negado!! este pedido nao pertence ao usuario logado.";
            res.render("telaErro", { pedido,Admin,msgErro })
        }
        console.log(pedido.data_entrega)
        if (pedido.data_entrega != null){
            const msgErro = "Este pedido ja está Finalizado";
            res.render("telaErro", { msgErro, Admin })
        }

        res.render("checkout", { pedido, Admin })

    },
    finalizar: async (req, res) => {
        const Admin = req.session.admin;
        const idPedido = req.params.id;
        const pedido = await db.Pedido.update({
            data_entrega: new Date()
        }, {
            where: {
                id: idPedido
            }
        })
        console.log(pedido)
        res.render("finalizacao", { pedido, Admin });


    },
    cancelar: (req, res) => {// nao ha necessidade de cancelar no momento

    },

}

module.exports = pedidoController;