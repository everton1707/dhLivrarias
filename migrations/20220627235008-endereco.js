'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable("endereco", {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      cep: Sequelize.STRING(8),
      estado: Sequelize.STRING(6),
      cidade: Sequelize.STRING(45),
      municipio: Sequelize.STRING(45),
      logradouro: Sequelize.STRING(60),
      numero: Sequelize.STRING(5),
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
     await queryInterface.dropTable('endereco');
  }
};
