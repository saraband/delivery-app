import db from './models';
import log from './log';
import fs from 'fs';
import jimp from 'jimp';

// RESOLUTIONS
// BIG 1500
// MEDIUM 800
// NORMAL 400
// SMALL 200
// THUMBNAIL: 20

const distPath = './dist/images/';
const Resolutions = {
  BIG: 1500,
  MEDIUM: 800,
  NORMAL: 500,
  SMALL: 250,
  THUMBNAIL: 25
};

function resizeTo(img, maxSize, name, id) {
  // calculate ratio
  const ratio = img.bitmap.width / img.bitmap.height;

  return img
  .resize(
    ratio > 1 ? maxSize : (maxSize * ratio),
    ratio > 1 ? (maxSize  / ratio) : maxSize
  )
  .quality(80)
  .write(`${distPath}r/${id}/${name}.${img.getExtension()}`);
}

(async () => {
  console.log('\n\n');
  log.server(`Searching images in ./src/server/data/images`)
  const srcPath = './src/server/data/images/';
  let srcImageFiles = [];
  let thumbnails = {};

  // Get the filenames
  srcImageFiles = fs.readdirSync('./src/server/data/images/').map(file => {
    return `${srcPath}${file}`;
  });

  log.server(`${srcImageFiles.length} images found.`);
  console.log('\n');

  /*
  srcImageFiles.forEach(file => {
    jimp.read(srcPath + file, (err, img) => {
      if (err) {
        console.log('could not read ', file);
      }

      console.log(`Resizing ${file}`)
      img.resize(500, 500).write(distPath + '/r/' + file);
    })
  })
  */

  log.db('Querying restaurants data...');
  const restaurants = await db.restaurant.findAll();

  log.db(`${restaurants.length} restaurants found`);
  log.db(`Generating images of different resolutions for those restaurants`);
  console.log('\n');

  let counter = 1;
  restaurants.slice(0, 5).forEach(async ({ dataValues: { id } }, index) => {
    let img = await jimp.read(`${srcImageFiles[index % srcImageFiles.length]}`);

    // RESIZE BIG
    await resizeTo(img, Resolutions.BIG, 'big', id);
    await resizeTo(img, Resolutions.MEDIUM, 'medium', id);
    await resizeTo(img, Resolutions.NORMAL, 'normal', id);
    await resizeTo(img, Resolutions.SMALL, 'small', id);

    // tumbnail
    await resizeTo(img, Resolutions.THUMBNAIL);
    thumbnails[id] = await img.getBase64Async(jimp.MIME_JPEG);
    console.log(thumbnails[id])
    console.log(`Generating images: ${counter++}/${restaurants.length}`);
  });
})()