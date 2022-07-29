'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable("pedido", {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      data: Sequelize.DATE,
      data_entrega: Sequelize.DATE,
      valor: Sequelize.FLOAT,
      avaliacao: Sequelize.FLOAT,
      cliente_id: {type: Sequelize.INTEGER.UNSIGNED, references: { model: 'cliente', key: 'id'}}//referenciando chave estrangeira
     
    });
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('pedido');
  }
};
