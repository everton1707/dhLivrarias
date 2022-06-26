const EnderecoModel = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('Endereco', {
        cep: DataTypes.STRING,
        estado: DataTypes.STRING,
        cidade: DataTypes.STRING,
        municipio: DataTypes.STRING,
        logradouro: DataTypes.STRING,
        numero: DataTypes.STRING,
        preco: DataTypes.FLOAT,      
    }, {
        tableName: 'endereco',
        timestamps: false
    })

    Endereco.associate = (models)=>{
        Endereco.belongsTo(models.Cliente, {foreignKey: "cliente_id"})
    }
    return Endereco;

}

module.exports = EnderecoModel;