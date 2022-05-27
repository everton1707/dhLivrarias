const produtoController = {
    index:(req, res)=>{
        res.render('home');
    },
    faleConosco:(req, res)=>{
        res.render('faleConosco');
    },
    usuario:(req, res)=>{
        res.render('painelUsuario');
    },
    login:(req, res)=>{
        //let prato = listaPratos.find(prato => prato.id == req.params.id);
        res.render('login');
    },
    cadastro:(req, res)=>{
        res.render('cadastroCliente');
    },
    finalizacao:(req, res)=>{
        res.render('finalizacao');
    }, 
     checkout:(req, res)=>{
        res.render('checkout');
    },
    carrinho:(req, res)=>{
        res.render('carrinho');
    }, 
     produto:(req, res)=>{
        res.render('produto');
    },
    criarCategoria:(req, res)=>{
        res.render('criarCategoria');
    }

 }
 


module.exports = produtoController;