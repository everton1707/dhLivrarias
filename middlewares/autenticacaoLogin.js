const autenticacaoLogin = (req, res, next) => {
    if(!req.session.idUsuario){
        next();
    }else{
        res.redirect("/usuario");
    }
}

module.exports = autenticacaoLogin;