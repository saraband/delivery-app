export const addParamsToUrl = (url, params) => {
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });

  return url;
};

export default {
  TEST: '/test',
  HOME: '/',
  RESTAURANTS_LIST: '/l/:city',
  RESTAURANT_DETAILS: '/r/:id/:city/:name',
  CHECKOUT: '/r/:id/:name/checkout'
};