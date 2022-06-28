const autenticacao = (req, res, next) => {
    if(!req.session.loginUsuario){
        res.redirect("/login");
    }else{
        next();
    }
}

module.exports = autenticacao;

/*
const { checkSchema } = require("express-validator");

const UsuarioCadastroValidator = checkSchema({
    nome: { isLength: { options: { min: 2 } }, errorMessage: "O nome é obrigatório" },
    nome_usuario: { isLength: { options: { min: 2 } }, errorMessage: "O nome de usuário é obrigatório" },
    email: { isEmail: true, errorMessage: "O e-mail é obrigatório" },
    senha: { isLength: { options: { min: 8 } }, errorMessage: "O senha é obrigatório" },
    confirma_senha: { custom: {
        options: (value, { req, location, path }) => {
            if(req.body.senha != value){
                return Promise.reject("O valor do campo senha está diferente da confirmação")
            }
        }
    }, errorMessage: "O campo confirmação de senha é obrigatório" },
    
});

module.exports = UsuarioCadastroValidator;*/