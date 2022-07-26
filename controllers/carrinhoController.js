const db = require("../models");


//implementar 
const carrinhoController = {
    adicionar:(req, res) => {
        const idCliente = req.session.idUsuario;
        /*criar tabela de pedido com id do usuario*/

        /*adicionar os produtos criando na tabela pedido_has_produto e adicionar a quantidade */

        



    },
    editar:(req,res) => {

    },
    deletar:(req,res) => {

    },
    finalizar:(req,res) => {

    },
}

module.exports = carrinhoController;