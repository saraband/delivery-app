import { hexToRgb } from 'HELPERS';

export default {
  BLACK: '#111111',
  LIGHT_GREY: '#DDD',
  GREY: '#999',
  DARK_GREY: '#1B4353',
  WHITE: '#FFFFFF',
  BLUE: '#0074D9', // this one is too google-ish
  LIGHT_BLUE: '#2892D7',
  PASTEL_BLUE: '#7180B9', // BLEU DE FRANCE
  //DARK_BLUE: '#001f3f',
  DARK_BLUE_2: '#0B3948',
  RED: '#FF4136'
};

/*TODO: maybe add this later
export default Object.keys(Colors).reduce((acc, key) => {
  const rgb = hexToRgb(Colors[key]);
  acc[key] = {
    hex: Colors[key],
    rgba: (alpha) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
  };

  return acc;
}, {});*/