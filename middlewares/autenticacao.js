const autenticacao = (req, res, next) => {
    if(!req.session.idUsuario){
        res.redirect("/usuario/login");
    }else{
        next();
    }
}

module.exports = autenticacao;