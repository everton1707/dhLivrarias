'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable("pedido", {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      data: Sequelize.DATEONLY,
      dataEntrega: Sequelize.DATEONLY,
      valor: Sequelize.FLOAT,
      avaliacao: Sequelize.FLOAT,
      cliente_id: {type: Sequelize.INTEGER.UNSIGNED, references: { model: 'cliente', key: 'id'}}//referenciando chave estrangeira
     
    });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('pedido');
  }
};
