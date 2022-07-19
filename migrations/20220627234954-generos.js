'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable("genero", {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      nome: Sequelize.STRING(30),
      descricao: Sequelize.STRING(50),

      foto_genero: Sequelize.STRING(100),//implementar front END
      createdAt: Sequelize.DATE, 
      updatedAt: Sequelize.DATE, 
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('genero');
  }
};
