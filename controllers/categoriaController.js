const db = require("../models");


const categoriaController = {
    
    criarCategoria: (req, res) => {
        res.render('criarCategoria');
    },
    salvarCategoria: function (req, res) {
        const errors = validationResult(req);
        /*db.categoria.create({
            nome: nome,
            descricao: descricao
        }).then(()=>{
            res.redirect('/listarCategoria');
        }).catch(()=>{
            console.log(errors);
        })*/

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render('criarCategoria', { errors });
        } else {
            const body = {
                nome: req.body.nome,
                descricao: req.body.descricao
            }
            categoria.push(body);
            console.log(categoria);
            res.render('faleConosco');
        }
    }
}

module.exports = categoriaController;