'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = await queryInterface.sequelize.query(`SELECT * FROM public.restaurants`);

    return Promise.all(restaurants[0].map((restaurant) => {
      return queryInterface.bulkUpdate(
        'restaurants',
        {
          tags: restaurant.tags.map((tag) => tag.toLowerCase())
        },
        {
          id: {
            [Sequelize.Op.eq]: restaurant.id
          }
        }
      );
    }));
  },

  down: async (queryInterface, Sequelize) => {
    const restaurants = await queryInterface.sequelize.query(`SELECT * FROM public.restaurants`);

    return Promise.all(restaurants[0].map((restaurant) => {
      return queryInterface.bulkUpdate(
        'restaurants',
        {
          tags: restaurant.tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
        },
        {
          id: {
            [Sequelize.Op.eq]: restaurant.id
          }
        }
      );
    }));
  }
};
