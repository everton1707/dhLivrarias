const produtoController = {
    index:(req, res)=>{
        res.render('painelUsuario');
    },
    login:(req, res)=>{
        //let prato = listaPratos.find(prato => prato.id == req.params.id);
        res.render('login');
    },
    cadastro:(req, res)=>{
        res.render('CadastroCliente');
    }
    
 }


module.exports = produtoController;