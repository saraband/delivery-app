import log from 'SERVER/log';
import jimp from 'jimp';
import fs from 'fs';
import db from 'SERVER/models';
import CliProgress from 'cli-progress';

const distPath = './dist/images/';
const srcPath = './src/server/data/images/';
const Resolutions = {
  BIG: 1500,
  MEDIUM: 800,
  NORMAL: 500,
  SMALL: 250
};

let counter = 0;
let notProcessedCounter = 0;

const progressBar = new CliProgress.Bar(
  { format: 'Resizing images: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} images processed.' },
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
    ++notProcessedCounter;
    progressBar.update(counter + notProcessedCounter);
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

  ++counter;
  progressBar.update(counter + notProcessedCounter);

  return img.write(filename);
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

  progressBar.start(restaurants.length * 4, 0);
  await Promise.all(restaurants.map(async ({ dataValues: { id } }, index) => {
    let img = await jimp.read(`${srcImageFiles[index % srcImageFiles.length]}`);

    // Resolutions
    await resizeAndSave(img, Resolutions.BIG, id, 'big');
    await resizeAndSave(img, Resolutions.MEDIUM, id, 'medium');
    await resizeAndSave(img, Resolutions.NORMAL, id, 'normal');
    await resizeAndSave(img, Resolutions.SMALL, id, 'small');

    return Promise.resolve();
  }));

  progressBar.stop();
  log.endl();
  log.info(`${counter} restaurants image sets generated ! (${notProcessedCounter} already existing)`);
  process.exit(0);
})();
