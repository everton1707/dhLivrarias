const produtoController = {
    index:(req, res)=>{
        res.render('home');
    },
    user:(req, res)=>{
        //let prato = listaPratos.find(prato => prato.id == req.params.id);
        res.render('painelUsuario');
    },
    faleConosco:(req, res)=>{
        res.render('faleConosco');
    }
 }


module.exports = produtoController;