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
      nome: Sequelize.STRING(30),
      descricao: Sequelize.TEXT,
      avaliacao: Sequelize.FLOAT,
      preco: Sequelize.FLOAT,
      categoria_id: {type: Sequelize.INTEGER.UNSIGNED, references: { model: 'categoria', key: 'id'}}
      //fotoDoProtuto: Sequelize.STRING(100),//implementar front END e banco
    
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('protuto');
  }
};
