const { checkSchema } = require("express-validator");

const validacaoCadastro = checkSchema({
    nome: { isLength: { options: { min: 2 } }, errorMessage: "O campo nome é obrigatório" },
    sobrenome: { isLength: { options: { min: 2 } }, errorMessage: "O campo sobrenome é obrigatório"},
    email: { isEmail: true, errorMessage: "O campo e-mail é obrigatório" },
    confirmeEmail: { custom: { 
        options: (value ,{ req, location, path }) =>{
            if(req.body.email != value){//value é  do campo confirmar email
                throw new Error ("Os emails não conferem!!");
            }
            return true;
        }
 
    }, errorMessage: "O campo confirmação de email é obrigatório" },

    senha: { isLength: { options: { min: 8 } }, errorMessage: "A senha é obrigatório" },
    confirmeSenha: { custom: {
        options: (value, { req, location, path }) => {
            if(req.body.senha != value){//value é  do campo confirmar senha
                throw new Error ("As senhas não conferem!!");
            }
            return true;
        }
    }, errorMessage: "O campo confirmação de senha é obrigatório" },
    
});

module.exports = validacaoCadastro;