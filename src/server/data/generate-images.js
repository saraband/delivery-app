import log from 'SERVER/log';
import fs from 'fs';
import db from 'SERVER/models';
import CliProgress from 'cli-progress';
import sharp from 'sharp';
import { ImageResolutions } from 'UTILS';

const distPath = './dist/images/';
const srcPath = './src/server/data/images/';
let counter = 0;
let notProcessedCounter = 0;

const progressBar = new CliProgress.Bar(
  { format: 'Resizing images: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} images processed.' },
  CliProgress.Presets.shades_classic
);

function doesFileAlreadyExist (filename) {
  return fs.existsSync(filename);
}

(async () => {
  let srcImageFiles = [];

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
  let restaurants = await db.restaurant.findAll();

  log.db(`${restaurants.length} restaurants found.`);
  log.info(`Generating images of different resolutions for those restaurants...`);

  progressBar.start(restaurants.length * ImageResolutions.length, 0);

  await Promise.all(restaurants.map(async (restaurant, index) => {
    const id = restaurant.dataValues.id;
    let image = await sharp(`${srcImageFiles[index % srcImageFiles.length]}`);

    // Resolutions
    for (let i = ImageResolutions.length - 1; i >= 0; --i) {
      const filename = `${distPath}restaurant/${id}/${ImageResolutions[i]}.jpeg`;

      if (doesFileAlreadyExist(filename)) {
        ++notProcessedCounter;
        progressBar.update(counter + notProcessedCounter);
        continue;
      }

      // Create folder if necessary
      if (!fs.existsSync(`${distPath}restaurant/${id}/`)) {
        fs.mkdirSync(`${distPath}restaurant/${id}/`);
      }

      await image.resize({ width: ImageResolutions[i] });
      await image.toFile(filename);

      ++counter;
      progressBar.update(counter + notProcessedCounter);
    }

    return Promise.resolve();
  }));

  progressBar.stop();
  log.endl();
  log.info(`${counter} restaurants image sets generated ! (${notProcessedCounter} already existing)`);
  process.exit(0);
})();
