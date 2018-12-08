'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('restaurants', 'phone', Sequelize.STRING);
    await queryInterface.addColumn('restaurants', 'address', Sequelize.STRING);
    await queryInterface.addColumn('restaurants', 'tags', Sequelize.ARRAY(Sequelize.INTEGER));
    await queryInterface.addColumn('restaurants', 'thumbnail', Sequelize.TEXT);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('restaurants', 'phone');
    await queryInterface.removeColumn('restaurants', 'address');
    await queryInterface.removeColumn('restaurants', 'tags');
    await queryInterface.removeColumn('restaurants', 'thumbnail');
  }
};
