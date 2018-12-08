const ImageResolutions = {
  250: 'small',
  500: 'normal',
  800: 'medium',
  1500: 'big'
};

export function getOptimalResolution (resolutionWidth) {
  for (let key in ImageResolutions) {
    if (key > resolutionWidth) {
      return ImageResolutions[key];
    }
  }

  console.error(`No resolution found for width: '${resolutionWidth}'`);
  return 'big';
}

export default ImageResolutions;