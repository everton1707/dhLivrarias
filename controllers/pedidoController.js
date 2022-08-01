const { Op } = require("sequelize");
const db = require('../models');


const pedidoController = {
    exibir: async (req, res) => {

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
        //console.log(pedido)
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
            /* 
            console.log(produtos[i].preco * pedidoHasProduto[i].quantidade);*/
            
        

            for (k = 0; k < pedidoHasProduto.length; k++) {

                console.log("------------------------------------------------")
                console.log(produtos[i].id)
                console.log(pedidoHasProduto[k].produto_id)
                if (produtos[i].id == pedidoHasProduto[k].produto_id) {
                    valorPedido = (produtos[i].preco * pedidoHasProduto[k].quantidade) + valorPedido;
                    


                    
                    console.log("Valor do Pedido: " + valorPedido)
                
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
        pedido.valor = valorPedido
        /* Logica antiga
        if (pedido.produtos != undefined){

            var valorPedido = 0;
            for (i = 0; i < pedido.produtos.length; i++) {
                valorPedido = valorPedido + pedido.produtos[i].preco;
            }
            
            await db.Pedido.update({
                valor: valorPedido
            }, {
                where: {
                    id: pedido.id
                }
            })
            pedido.valor = valorPedido
        }else{
            pedido.produtos = [];
        }*/

        res.render("carrinho", { pedido, pedidoHasProduto, produtos });

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

            },
            include: ["produtos"]
        })
        await db.Pedido_has_produto.destroy({
            where: {
                pedido_id: pedido.id,
                produto_id: idProduto
            }
        })


        res.redirect('/carrinho');
    },
    pagamento: async (req, res) => {

        const pedido = await db.Pedido.findOne({
            where: {
                id: req.params.id
            },
            include: ["produtos", "cliente"]
        })

        if (pedido.cliente_id != req.session.idUsuario) {
            res.send("Acesso negado!! este pedido nao pertence ao usuario logado.", { pedido })
        }


        res.render("checkout", { pedido })

    },
    finalizar: async (req, res) => {
        const idPedido = req.params.id;

        const pedido = await db.Pedido.update({
            data_entrega: new Date()
        }, {
            where: {
                id: idPedido
            }
        })
        console.log(pedido)
        res.render("finalizacao", { pedido });


    },
    cancelar: (req, res) => {

    },

}

module.exports = pedidoController;