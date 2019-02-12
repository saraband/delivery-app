/**
 * Helpers, constants used in the server and the client
 */

// min inclusive, max inclusive
export function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// min inclusive, max exclusive
export function randomDecimal (min, max) {
  return Math.random() * (max - min) + min;
}
