export const addParamsToUrl = (url, params) => {
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });

  return url;
};

export default {
  HOME: '/',
  RESTAURANTS_LIST: '/list/:city',
  RESTAURANT_DETAILS: '/r/:restaurantId',
  CHECKOUT: '/checkout'
};