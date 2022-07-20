const ClienteModel = (sequelize, DataType) => {
    const Cliente = sequelize.define('Cliente', {

        email: DataType.STRING,
        nome: DataType.STRING,
        sobrenome: DataType.STRING,
        senha: DataType.STRING,//exemplo
        foto_perfil: DataType.STRING,
        createdAt: DataType.DATE, 
        updatedAt: DataType.DATE, 

    }, {
        tableName: 'cliente',
        timestamp: false
    })
   


    return Cliente;
}
module.exports = ClienteModel;