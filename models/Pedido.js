const PedidoModel = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        data: DataTypes.DATE,
        data_entrega: DataTypes.DATE,
        valor: DataTypes.FLOAT,
        avaliacao: DataTypes.FLOAT,
    }, {
        tableName: 'pedido',
        timestamps: false
    })

    Pedido.associate = (models)=>{
        Pedido.belongsTo(models.Cliente, {as: "cliente", foreignKey: "cliente_id"})

        Pedido.belongsToMany(models.Produto, {
            as: 'produtos',
            through: "pedido_has_produto",
            foreignKey: "pedido_id",
            otherKey: "produto_id",
            quantidade: DataTypes.INTEGER,
            valor: DataTypes.FLOAT
        })
    }



    return Pedido;

}

module.exports = PedidoModel;