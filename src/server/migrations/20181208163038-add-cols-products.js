'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'description', Sequelize.STRING);
    await queryInterface.addColumn('products', 'ingredients', Sequelize.ARRAY(Sequelize.STRING));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'description');
    await queryInterface.removeColumn('products', 'ingredients');
  }
};
