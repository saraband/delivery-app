'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = await queryInterface.sequelize.query(`SELECT * FROM public.restaurants`);

    return Promise.all(restaurants[0].map(restaurant => {
      return queryInterface.bulkUpdate(
        'restaurants',
        {
          image_url: `/images/restaurants/${restaurant.id}/:size.jpeg`
        },
        {
          id: {
            [Sequelize.Op.eq]: restaurant.id
          }
        }
      );
    }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      'restaurants',
      {
        image_url: null
      },
      {}
    );
  }
};
