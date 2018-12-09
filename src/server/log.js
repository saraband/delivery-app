/*
**  Pretty logs :]
*/

import chalk from 'chalk';
import moment from 'moment';

export default {
  server: (message) => {
    console.log(
      chalk.white.bgGreen(` ${moment(Date.now()).format('LT')} `) +
      chalk.green(` Server: ${message}`)
    );
  },
  db: (message) => {
    console.log(
      chalk.white.bgMagenta(` ${moment(Date.now()).format('LT')} `) +
      chalk.magenta(` Database: ${message}`)
    );
  },
  info: (message) => {
    console.log(
      chalk.white.bgHex('#0074D9')(` ${moment(Date.now()).format('LT')} `) +
      chalk.white(` ${message}`)
    );
  },
  endl: () => console.log('\n')
}