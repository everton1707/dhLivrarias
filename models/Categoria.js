const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    const Categoria = sequelize.define('Categoria',{
        
        nome: DataTypes.string,
        descricao: DataTypes.string,
        

        /* -- campos da tabela do banco de dados -- */ 
    },{
        tableName: 'categoria',
        timestamp: false
    })
        return Categoria;
}