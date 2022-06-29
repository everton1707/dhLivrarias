const { checkSchema, body } = require("express-validator");

const validacaoCadastro = checkSchema({
    nome: { isLength: { options: { min: 2 } }, errorMessage: "O nome é obrigatório" },
    sobrenome: { isLength: { options: { min: 2 } }, errorMessage: "O sobrenome é obrigatório" },
    email: { isEmail: true, errorMessage: "O e-mail é obrigatório" },
    confirmeEmail: { custom: { 
        options: (value ,{ req, location, path }) =>{
            if(req.body.email != value){//value é  do campo confirmar email
                return Promise.reject("os emails não conferem!!")
            }
        }

    }  },

    senha: { isLength: { options: { min: 8 } }, errorMessage: "O senha é obrigatório" },
    confirmeSenha: { custom: {
        options: (value, { req, location, path }) => {
            if(req.body.senha != value){//value é  do campo confirmar senha
                return Promise.reject("As senhas não conferem!!")
            }
        }
    }, errorMessage: "O campo confirmação de senha é obrigatório" },
    
});

module.exports = validacaoCadastro;