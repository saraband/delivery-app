import db from './models';

(async () => {
  const results = await db.restaurant.findAll()
  results.forEach((restaurant) => console.log(restaurant.name))
})()
