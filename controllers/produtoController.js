const produtoController = {
    index:(req, res)=>{
        res.render('home');
    },
    faleConosco:(req, res)=>{
        res.render('faleConosco');
    }
 }
 


module.exports = produtoController;