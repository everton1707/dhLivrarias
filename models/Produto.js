

const ProdutoModel = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        avaliacao: DataTypes.FLOAT,
        preco: DataTypes.FLOAT,
        foto_livro: DataTypes.STRING,
        /*campos do banco de dados*/
    }, {
        tableName: 'produto',
        timestamps: false
    });


    Produto.associate = (models)=>{
        Produto.belongsTo( models.Genero, { as: "genero", foreignKey: "genero_id"});
    }
    return Produto;

}

module.exports = ProdutoModel;