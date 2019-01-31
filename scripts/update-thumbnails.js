import log from 'SERVER/log';
import sharp from 'sharp';
import fs from 'fs';
import db from 'SERVER/models';
import { Op } from 'sequelize';
import CliProgress from 'cli-progress';
import { ImageResolutions } from 'UTILS';

(async () => {
  let counter = 1;
  const THUMBNAIL_WIDTH = 25;
  const distPath = './dist/images/restaurants/';
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

    // Generating base 64 thumbnail
    let image = await sharp(`${distPath}${id}/${ImageResolutions[0]}.jpeg`);
    await image.resize({ width: THUMBNAIL_WIDTH });
    const data = await image.toBuffer();
    const base64string = `data:image/png;base64,${data.toString('base64')}`;

    // Update DB
    await db.restaurant.update(
      { thumbnail: base64string },
      { where: { id: { [Op.eq]: id } } }
    );

    progressBar.update(counter++);
    return Promise.resolve();
  }));

  progressBar.stop();
  log.info(`${restaurantIds.length} thumbnails successfully updated in DB !`);
  process.exit(0);
})();
