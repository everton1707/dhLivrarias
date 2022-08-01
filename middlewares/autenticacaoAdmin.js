const autenticacao = (req, res, next) => {
    if(!req.session.admin){
        res.redirect("/usuario/login");
    }else{
        next();
    }
}

module.exports = autenticacao;