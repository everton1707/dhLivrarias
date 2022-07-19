

module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define('Genero', {

        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        fotoGenero: DataTypes.STRING
    }, {
        tableName: 'genero',
        timestamps: false
    })
    return Genero;
}