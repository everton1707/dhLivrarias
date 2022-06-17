//const { DataTypes } = require("sequelize/types");
//const { sequelize } = require(".");

const ProdutoModel = (sequelize, DataType)=>{
    const Produto = sequelize.define('Produto',{
        nome: DataType.STRING,
        descricao: DataType.STRING,
        avaliacao: DataType.FLOAT,
        preco: DataType.FLOAT,
        categoria_idcategoria: DataType.INTEGER
        /*campos do banco de dados*/
    },{
        tableName: 'produto',
        timestamps: false
    })
    return Produto;
}

module.exports = ProdutoModel;