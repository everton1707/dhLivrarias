'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable("pedido_has_produto", {
      pedido_id: {type: Sequelize.INTEGER.UNSIGNED, references: { model: 'pedido', key: 'id'}},
      produto_id: {type: Sequelize.INTEGER.UNSIGNED, references: { model: 'produto', key: 'id'}},
      quantidade: Sequelize.INTEGER,
      valor: Sequelize.FLOAT,
     
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('pedido_has_produto');
  }
};
