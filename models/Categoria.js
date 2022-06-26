

module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {

        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,

    }, {
        tableName: 'categoria',
        timestamps: false
    })
    return Categoria;
}