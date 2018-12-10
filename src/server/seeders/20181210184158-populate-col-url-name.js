'use strict';

function getUrlName (name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '');
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = await queryInterface.sequelize.query(`SELECT * FROM public.restaurants`);

    return Promise.all(restaurants[0].map((restaurant) => {
      return queryInterface.bulkUpdate(
        'restaurants',
        {
          urlName: getUrlName(restaurant.name),
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
        urlName: null
      },
      {}
    );
  }
};
