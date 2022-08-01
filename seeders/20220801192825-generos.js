'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    //return
    /*
    await queryInterface.bulkInsert('genero', [{
      nome: Sequelize.STRING(30),
      descricao: Sequelize.STRING(50),



    }], {});
*/



  },

  async down(queryInterface, Sequelize) {
    //return
    await queryInterface.bulkDelete('genero', null, {});
  }
};
