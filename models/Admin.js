const AdminModel = (sequelize, DataType) => {
    const Admin = sequelize.define('Admin', {
        email: DataType.STRING,
        nome: DataType.STRING,
        sobrenome: DataType.STRING,
        senha: DataType.STRING,
        foto_perfil: DataType.STRING,
        createdAt: DataType.DATE,
        updatedAt: DataType.DATE,

    }, {
        tableName: 'cliente',
        timestamp: false
    })

    return Admin;
}
module.exports = AdminModel;