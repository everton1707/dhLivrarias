const id = require('faker-br/lib/locales/id_ID');
const db = require('../models');
//const { carrinho } = require('./produtoController');

const pedidoController = {
    exibir: async (req, res) => {

        const pedido = await db.Pedido.findOne({
            where: {
                cliente_id: req.session.idUsuario,
                data_entrega: null,
                 
            },
            include: ["produtos"]
        
    })

        // consultar itens do carrinho e adicionalos a variavel



        if (pedido == null) {
            // criando novo pedido
            pedido = await db.Pedido.create({
                data: new Date(),
                valor: 0,
                avaliacao: 0,
                cliente_id: req.session.idUsuario
            }, {
                include: ["produtos"]
            })
           
        } 

    res.render("carrinho", { pedido });

        



        //testar um logica por vez
    },
    adicionar: async (req, res) => {
        const idProduto = req.params.id;
        const produto = await db.Produto.findByPk(idProduto);

        const pedido = await db.Pedido.findOne({
            where: {
                cliente_id: req.session.idUsuario,
                data_entrega: null
            }
        })
        if (pedido == null) {
            // criando novo pedido
            const pedidoCriado = await db.Pedido.create({
                data: new Date(),
                cliente_id: req.session.idUsuario
            }, {
                include: ["produtos"]
            })
/*      TESTE
            console.log("**********************  Pedido Criado  **********************")
            console.log(pedidoCriado.id);
            pedido = pedidoCriado;*/
        }
        const resultado = await db.Pedido_has_produto.findOne({where: {
            pedido_id: pedido.id,
            produto_id: produto.id,
        }})
        // fazer verificação se existe esse produto no carrinho 
        // criar registro na tabela de pedido_has_produtos 
        if (resultado == null){

            await db.Pedido_has_produto.create({
                pedido_id: pedido.id,
                produto_id: produto.id,
                /*quantidade: 1,
                valor: produto.preco,*/// tirar futuramente do banco
                
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
        await db.Pedido_has_produto.destroy({where:{
            pedido_id: pedido.id,
            produto_id:idProduto
        }})
        
        res.redirect('/carrinho');
    },
    finalizar: (req, res) => {

    },
    cancelar: (req, res) => {

    },
}

module.exports = pedidoController;