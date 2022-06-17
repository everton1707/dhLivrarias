

module.exports = (sequelize, DataType)=>{
    const Cliente = sequelize.define('Cliente',{

        email: DataType.STRING,
        nome: DataType.STRING,
        sobrenome: DataType.STRING,
        senha: DataType.STRING,

     
    },{
        tableName: 'cliente',
        timestamp: false
    })
        return Cliente;
}