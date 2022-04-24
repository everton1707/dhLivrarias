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
    },
    finalizacao:(req, res)=>{
        res.render('finalizacao');
    }, 
     checkout:(req, res)=>{
        res.render('checkout');
    },
    
 }


module.exports = produtoController;