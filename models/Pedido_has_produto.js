const Pedido_has_produtoModel = (Sequelize, DataTypes) => {
    const Pedido_has_produto = Sequelize.define('Pedido_has_produto', {
        pedido_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
        produto_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
        quantidade: DataTypes.INTEGER,
        valor: DataTypes.FLOAT,
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE, 
        
    }, {
        tableName: 'pedido_has_produto',
        timestamps: true
    });

  

    return Pedido_has_produto;

}

module.exports = Pedido_has_produtoModel;