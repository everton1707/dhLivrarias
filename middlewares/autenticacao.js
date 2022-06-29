const autenticacao = (req, res, next) => {
    if(!req.session.loginUsuario){
        res.redirect("/usuario/login");
    }else{
        next();
    }
}

module.exports = autenticacao;