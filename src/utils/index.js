/*
 *  Helpers, constants used in the server and the client
 */

// min inclusive, max inclusive
export function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// min inclusive, max exclusive
export function randomDecimal (min, max) {
  return Math.random() * (max - min) + min;
}

export const ImageResolutions = [
  200,
  400,
  600,
  800,
  1000,
  1500
];

export function getOptimalResolution (width) {
  for (let resolution of ImageResolutions) {
    if (resolution > width) {
      return resolution;
    }
  }

  console.error(`No resolution found for width: ${width}px`);
  return ImageResolutions[ImageResolutions.length - 1];
}

export default ImageResolutions;