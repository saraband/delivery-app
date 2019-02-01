'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const imagesPath = path.resolve(__dirname + '../../../../dist/images/restaurants');
    const imagesName = fs.readdirSync(imagesPath).filter((name) => name.charAt(0) !== '.'); // filter is for .DS_STORE
    const restaurants = await queryInterface.sequelize.query(`SELECT * FROM public.restaurants`);

    // Generating base 64 thumbnail
    const imagesThumbnails = [];
    for (let name of imagesName) {
      let image = await sharp(path.resolve(imagesPath, name));
      await image.resize({ width: 30 });
      const data = await image.toBuffer();
      imagesThumbnails.push(`data:image/png;base64,${data.toString('base64')}`);
    }

    return Promise.all(restaurants[0].map((restaurant, index) => {
      return queryInterface.bulkUpdate(
        'restaurants',
        {
          image_url: `/images/restaurants/${imagesName[index % imagesName.length]}`,
          thumbnail: imagesThumbnails[index % imagesName.length]
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
        image_url: null,
        thumbnail: null
      },
      {}
    );
  }
};
