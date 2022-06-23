// const dotenv = require('dotenv');
// dotenv.config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(
    process.env.DATABASE_URL 
    || 'postgres://my_user:root@localhost:5432/my_database',
  {
    logging: true,
  },
);

module.exports = db;
