const ClienteModel = (sequelize, DataType) => {
    const Cliente = sequelize.define('Cliente', {

        email: DataType.STRING,
        nome: DataType.STRING,
        sobrenome: DataType.STRING,
        senha: DataType.STRING(60),//exemplo
        createdAt: DataType.DATE, 
        updatedAt: DataType.DATE, 

    }, {
        tableName: 'cliente',
        timestamp: false
    })
   


    return Cliente;
}
module.exports = ClienteModel;