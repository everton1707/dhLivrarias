'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable("produto", {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true},
      nome: Sequelize.STRING(100),
      descricao: Sequelize.TEXT,
      autor: Sequelize.TEXT,
      editora: Sequelize.TEXT,
      avaliacao: Sequelize.FLOAT,
      preco: Sequelize.FLOAT,
      genero_id: {type: Sequelize.INTEGER.UNSIGNED, references: { model: 'genero', key: 'id'}},
      createdAt: Sequelize.DATE, 
      updatedAt: Sequelize.DATE, 
      foto_livro: Sequelize.STRING(100),
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('produto');
  }
};
