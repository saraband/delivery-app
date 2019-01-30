'use strict';

function randomDecimal (min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = await queryInterface.sequelize.query(`SELECT * FROM public.restaurants`);

    return Promise.all(restaurants[0].map(restaurant => {
      return queryInterface.bulkUpdate(
        'restaurants',
        {
          rating: randomDecimal(5, 10).toFixed(1)
        },
        {
          id: {
            [Sequelize.Op.eq]: restaurant.id
          }
        }
      );
    }));
  },

  down: (queryInterface) => {
    return queryInterface.bulkUpdate(
      'restaurants',
      {
        rating: null
      },
      {}
    );
  }
};
