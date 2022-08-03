const db = require("../models");


//implementar 
const enderecoController = {
    cadastrar:(req, res) => {
        const Admin = req.session.admin;
        res.render('cadastroEndereco', {Admin});
    },
    editar:(req,res) => {

    },
    deletar:(req,res) => {

    },
    listar: (req,res) => {

    }
}



module.exports = enderecoController;