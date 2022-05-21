const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    const Usuario = sequelize.define('Usuario',{
        /* -- campos da tabela do banco de dados -- */ 
    },{
        tableName: 'usuarios',
        timestamp: false
    })
        return Usuario;
}