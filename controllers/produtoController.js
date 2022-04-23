const produtoController = {
    index:(req, res)=>{
        res.render('home');
    },
    user:(req, res)=>{
        //let prato = listaPratos.find(prato => prato.id == req.params.id);
        res.render('painelUsuario');
    },
    finalizacao:(req, res)=>{
        res.render('finalizacao');
    }, 
     checkout:(req, res)=>{
        res.render('checkout');
    },
 }
 


module.exports = produtoController;