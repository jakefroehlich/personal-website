const chalk = require('chalk');
const db = require('./db');
const { models } = require('./models');

const sync = async (force = false) => {
  try {
    await db.sync({ force });
    console.log(chalk.blueBright('DB Sync Successful', `force: ${force}`));
  } catch (e) {
    console.log(chalk.redBright('DB Sync failed'));
    console.log(e);
  }
};

module.exports = {
  db,
  models,
  sync,
};
