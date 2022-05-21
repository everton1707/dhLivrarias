const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    const Usuario = sequelize.define('Usuario',{
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        preco: DataTypes.float,
        /*campos do banco de dados*/ 
    },{
        tableName: 'produtos',
        timestamp: false
    })
}