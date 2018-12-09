import log from 'SERVER/log';
import jimp from 'jimp';
import fs from 'fs';
import db from 'SERVER/models';
import sequelize, { Op } from 'sequelize';
import CliProgress from 'cli-progress';

(async () => {

  let counter = 1;
  const distPath = './dist/images/restaurant/';
  const restaurantIds = fs.readdirSync(distPath);
  const progressBar = new CliProgress.Bar(
    { format: 'Inserting thumbnails in DB: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} thumbnails inserted.' },
    CliProgress.Presets.shades_classic
  );

  log.endl();
  console.log('============================================================');
  console.log('================== update-thumbnails script ================');
  console.log('============================================================');
  log.endl();

  log.info(`Found ${restaurantIds.length} restaurant folders in ${distPath}`);
  log.info(`Proceeding to update thumbnails in database...`);

  progressBar.start(restaurantIds.length, 0);
  await Promise.all(restaurantIds.map(async (id) => {

    // Generating thumbnail
    let img = await jimp.read(`${distPath}${id}/small.jpeg`);
    const ratio = img.bitmap.width / img.bitmap.height;

    await img.resize(25, 25 / ratio);

    // If height > width, we crop it to a square
    if (ratio < 1) {
      await img.crop(0, (img.bitmap.height - 25) / 2, 25, 25);
    }

    // Base 64 string
    await img.quality(80);
    const b64img = await img.getBase64Async(jimp.MIME_JPEG);

    // Update DB
    await db.restaurant.update(
      { thumbnail: b64img },
      { where: { id: { [Op.eq]: id } } }
    );

    progressBar.update(counter++);
    return Promise.resolve();
  }));

  progressBar.stop();
  log.info(`${restaurantIds.length} thumbnails successfully updated in DB !`);
  process.exit(0);
})();