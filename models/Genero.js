

module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define('Genero', {

        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        foto_genero: DataTypes.STRING
    }, {
        tableName: 'genero',
        timestamps: false
    })
    return Genero;
}