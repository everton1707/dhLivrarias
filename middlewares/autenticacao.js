const autenticacao = (req, res, next) => {
    if(!req.session.email){
        res.redirect("/usuario/login");
    }else{
        next();
    }
}

module.exports = autenticacao;