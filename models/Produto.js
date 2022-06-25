

const ProdutoModel = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        avaliacao: DataTypes.FLOAT,
        preco: DataTypes.FLOAT,
        categoria_id: DataTypes.INTEGER
        /*campos do banco de dados*/
    }, {
        tableName: 'produto',
        timestamps: false
    })
    return Produto;

}

module.exports = ProdutoModel;