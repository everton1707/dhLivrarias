const PedidoModel = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        //data: DataTypes.DATE,
        //dataEntrega: DataType.DATE,
        valor: DataTypes.FLOAT,
        avaliacao: DataTypes.FLOAT,

        /*campos do banco de dados*/
    }, {
        tableName: 'pedido',
        timestamps: true
    })

    Pedido.associate = (models)=>{
        Pedido.belongsTo(models.Cliente, {as: "cliente", foreignKey: "cliente_id"})

        Pedido.belongsToMany(models.Produto, {
            as: 'produto',
            through: "pedidos_has_produto",
            foreignKey: "pedido_id",
            otherKey: "produto_id",
            //quantidade: DataTypes.INTEGER
        })
    }



    return Pedido;

}

module.exports = PedidoModel;