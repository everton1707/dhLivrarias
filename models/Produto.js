const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

const ProdutoModel = (sequelize, DataTypes)=>{
    const Produto = sequelize.define('Produto',{
        nome: DataTypes.STRING,
        descricao: DataTypes.string,
        avaliacao: DataTypes.float,
        preco: DataTypes.float,
        categoria_idcategoria: DataTypes.integer
        /*campos do banco de dados*/
    },{
        tableName: 'produto',
        timestamp: false
    })

    return Produto;
}

module.exports = ProdutoModel;