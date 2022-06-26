

const ProdutoModel = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        avaliacao: DataTypes.FLOAT,
        preco: DataTypes.FLOAT,

        /*campos do banco de dados*/
    }, {
        tableName: 'produto',
        timestamps: false
    });


    Produto.associate = (models)=>{
        Produto.belongsTo(models.Categoria, {foreignKey: "cateoria_id"})
    }
    return Produto;

}

module.exports = ProdutoModel;