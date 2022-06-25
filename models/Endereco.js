const EnderecoModel = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('Endereco', {
        cep: DataTypes.STRING,
        estado: DataTypes.STRING,
        cidade: DataTypes.STRING,
        municipio: DataTypes.STRING,
        logradouro: DataTypes.STRING,
        numero: DataTypes.STRING,
        preco: DataTypes.FLOAT,
        cliente_id: DataTypes.INTEGER
        
    }, {
        tableName: 'endereco',
        timestamps: false
    })
    return Endereco;

}

module.exports = EnderecoModel;