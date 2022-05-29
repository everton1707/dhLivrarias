const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    const Cliente = sequelize.define('Cliente',{
        idcliente: DataTypes.int,
        email: DataTypes.string,
        nome: DataTypes.string,
        sobrenome: DataTypes.string,
        senha: DataTypes.string,

        /* -- campos da tabela do banco de dados -- */ 
    },{
        tableName: 'usuario',
        timestamp: false
    })
        return Cliente;
}