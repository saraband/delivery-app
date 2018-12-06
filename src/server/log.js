/*
**  Pretty logs :]
*/

import chalk from 'chalk';
import moment from 'moment';

export default {
  server: (message) => {
    console.log(
      chalk.white.bgGreen(` ${moment(Date.now()).format('LT')} `) +
      chalk.green(` Server: ${message}.\n`)
    )
  },
  db: (message) => {
    console.log(
      chalk.white.bgMagenta(` ${moment(Date.now()).format('LT')} `) +
      chalk.magenta(` Database: ${message}.\n`)
    )
  }
}