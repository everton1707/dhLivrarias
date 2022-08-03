const autenticacaoCadastro = (req, res, next) => {
    if(!req.session.idUsuario){
        next();
    }else{
        if(!req.session.admin){
            res.redirect("/usuario");
        }else{
            next();
        }
    }
}

module.exports = autenticacaoCadastro;