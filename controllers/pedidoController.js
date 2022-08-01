
const db = require('../models');


const pedidoController = {
    exibir: async (req, res) => {

        var pedido = await db.Pedido.findOne({
            where: {
                cliente_id: req.session.idUsuario,
                data_entrega: null,

            },
            include: ["produtos"]

        })


        if (pedido == null) {
            pedido = await db.Pedido.create({
                data: new Date(),
                valor: 0,
                avaliacao: 0,
                cliente_id: req.session.idUsuario
            }, {
                include: ["produtos"]
            })
        }
        
        
        
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
        }
        
        res.render("carrinho", { pedido });

    },
    adicionar: async (req, res) => {
        const idProduto = req.params.id;
        const produto = await db.Produto.findByPk(idProduto);

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
            }, {
                include: ["produtos"]
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