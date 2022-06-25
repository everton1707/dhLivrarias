const PedidoModel = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        //data: DataTypes.DATEONLY,
        //dataEntrega: DataType.DATEONLY,
        valor: DataTypes.FLOAT,
        avaliacao: DataTypes.FLOAT,
        cliente_id: DataTypes.INTEGER
        /*campos do banco de dados*/
    }, {
        tableName: 'pedido',
        timestamps: false
    })
    return Pedido;

}

module.exports = PedidoModel;