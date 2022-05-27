const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

const ProdutoModel = (sequelize, DataTypes)=>{
    const Produto = sequelize.define('Produto',{
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        preco: DataTypes.float,
        /*campos do banco de dados*/
    },{
        tableName: 'produtos',
        timestamp: false
    })

    return Produto;
}

module.exports = ProdutoModel;