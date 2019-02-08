'use strict';

const Faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkUpdate(
      'restaurants',
      {
        description: Faker.lorem.sentences()
      },
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkUpdate(
      'restaurants',
      {
        description: null
      },
      {}
    );
  }
};
