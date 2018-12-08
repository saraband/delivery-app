import log from 'SERVER/log';
import jimp from 'jimp';
import fs from 'fs';
import db from 'SERVER/models';
import sequelize, { Op } from 'sequelize';

const distPath = './dist/images/';
const srcPath = './src/server/data/images/';
const Resolutions = {
  BIG: 1500,
  MEDIUM: 800,
  NORMAL: 500,
  SMALL: 250,
  THUMBNAIL: 25
};

function doesFileAlreadyExist (filename) {
  return fs.existsSync(filename);
}

function resizeAndSave(img, maxSize, id, name) {
  // Calculate image ratio
  const ratio = img.bitmap.width / img.bitmap.height;
  const filename = `${distPath}restaurant/${id}/${name}.${img.getExtension()}`;

  img = img
    .resize(
      ratio > 1 ? maxSize : (maxSize * ratio),
      ratio > 1 ? (maxSize  / ratio) : maxSize
    )
    .quality(80);

  // Thumbnail case, we don't save it
  if (maxSize < Resolutions.SMALL) {
    return img;
  }

  // We check before if the file exist
  // If it does we don't save it
  if (doesFileAlreadyExist(filename)) {
    console.log(filename + ' already exists');
    return img;
  }

  return img.write(filename);
}

(async () => {
  let counter = 1;
  let srcImageFiles = [];
  let thumbnails = {};

  log.endl();
  log.info('===== generate-images script =====');

  log.info(`Searching source images in ${srcPath}`);
  srcImageFiles = fs.readdirSync(srcPath).map(file => `${srcPath}${file}`);

  log.info(`${srcImageFiles.length} images found.`);

  // QUERYING DB
  log.info('Querying restaurants data...');
  const restaurants = await db.restaurant.findAll();

  log.db(`${restaurants.length} restaurants found.`);
  log.info(`Generating images of different resolutions for those restaurants...`);

  await Promise.all(restaurants.map(async ({ dataValues: { id } }, index) => {
    let img = await jimp.read(`${srcImageFiles[index % srcImageFiles.length]}`);

    // Resolutions
    await resizeAndSave(img, Resolutions.BIG, id, 'big');
    await resizeAndSave(img, Resolutions.MEDIUM, id, 'medium');
    await resizeAndSave(img, Resolutions.NORMAL, id, 'normal');
    await resizeAndSave(img, Resolutions.SMALL, id, 'small');

    // Thumbnail
    await resizeAndSave(img, Resolutions.THUMBNAIL);
    thumbnails[id] = await img.getBase64Async(jimp.MIME_JPEG);

    log.info(`Generating images: ${counter++}/${restaurants.length}.`);
    return Promise.resolve();
  }));

  // We update the thumbnails in DB
  await Promise.all(restaurants.map(({ dataValues: { id } }) => {
    return db.restaurant.update(
      { thumbnail: thumbnails[id] },
      { where: { id: { [Op.eq]: id } } }
    );
  }));

  log.endl();
  log.info(`${restaurants.length} images successfully generated !`);
})();
