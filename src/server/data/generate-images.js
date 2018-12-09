import log from 'SERVER/log';
import jimp from 'jimp';
import fs from 'fs';
import db from 'SERVER/models';
import sequelize, { Op } from 'sequelize';
import CliProgress from 'cli-progress';

const distPath = './dist/images/';
const srcPath = './src/server/data/images/';
const Resolutions = {
  BIG: 1500,
  MEDIUM: 800,
  NORMAL: 500,
  SMALL: 250,
  THUMBNAIL: 25
};

const resizingProgressBar = new CliProgress.Bar(
  { format: 'Resizing images: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} images processed.' },
  CliProgress.Presets.shades_classic
);

const insertingThumbnailsBar = new CliProgress.Bar(
  { format: 'Inserting thumbnails in DB: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} thumbnails inserted.' },
  CliProgress.Presets.shades_classic
);

function doesFileAlreadyExist (filename) {
  return fs.existsSync(filename);
}

function resizeAndSave(img, maxSize, id, name) {
  // Calculate image ratio
  const ratio = img.bitmap.width / img.bitmap.height;
  const filename = `${distPath}restaurant/${id}/${name}.${img.getExtension()}`;

  // We check before if the file exist
  // If it does we don't do anything
  if (doesFileAlreadyExist(filename)) {
    return img;
  }

  img = img
    .resize(
      maxSize,
      maxSize  / ratio
    )
    .quality(80);

  // If height > width, we crop it to a square
  if (ratio < 1) {
    img = img.crop(
      0,
      (img.bitmap.height - maxSize) / 2,
      maxSize,
      maxSize
    );
  }

  // Thumbnail case, we don't save it
  if (maxSize < Resolutions.SMALL) {
    return img;
  }

  return img.write(filename);
}

(async () => {
  let counter = 1;
  let srcImageFiles = [];
  let thumbnails = {};

  log.endl();
  console.log('============================================================');
  console.log('================== generate-images script ==================');
  console.log('============================================================');
  log.endl();

  log.info(`Searching source images in ${srcPath}`);
  srcImageFiles = fs.readdirSync(srcPath).map(file => `${srcPath}${file}`);

  log.info(`${srcImageFiles.length} images found.`);

  // QUERYING DB
  log.info('Querying restaurants data...');
  const restaurants = await db.restaurant.findAll();

  log.db(`${restaurants.length} restaurants found.`);
  log.info(`Generating images of different resolutions for those restaurants...`);

  resizingProgressBar.start(restaurants.length, 0);
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

    resizingProgressBar.update(counter++);
    return Promise.resolve();
  }));

  resizingProgressBar.stop();

  // We update the thumbnails in DB
  let insertingThumbnailsCounter = 1;
  insertingThumbnailsBar.start(restaurants.length, 0);
  await Promise.all(restaurants.map(async ({ dataValues: { id } }) => {
    await db.restaurant.update(
      { thumbnail: thumbnails[id] },
      { where: { id: { [Op.eq]: id } } }
    );

    insertingThumbnailsBar.update(insertingThumbnailsCounter++);

    return Promise.resolve();
  }));

  insertingThumbnailsBar.stop();

  log.endl();
  log.info(`${restaurants.length} images successfully generated !`);

  process.exit(0);
})();
