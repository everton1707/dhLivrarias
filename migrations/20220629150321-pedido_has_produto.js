'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable("pedido_has_produto", {
      pedido_id: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'pedido', key: 'id'}},
      produto_id: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'produto', key: 'id'}},
      quantidade: Sequelize.INTEGER,
      valor: Sequelize.FLOAT,
      createdAt: Sequelize.DATE, 
      updatedAt: Sequelize.DATE, 
    });
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('pedido_has_produto');
  }
};
