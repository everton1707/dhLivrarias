const ClienteModel = (sequelize, DataType) => {
    const Cliente = sequelize.define('Cliente', {

        email: DataType.STRING,
        nome: DataType.STRING,
        sobrenome: DataType.STRING,
        senha: DataType.STRING(60),//exemplo

    }, {
        tableName: 'cliente',
        timestamp: false
    })
   


    return Cliente;
}
module.exports = ClienteModel;