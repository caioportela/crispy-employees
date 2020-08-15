const logger = require('../src/loaders/logger');

const database = {
  development: {
    dialect: 'sqlite',
    storage: '../databases/database.db',
    logging: (msg) => logger.debug(msg),
    define: { charset: 'utf8', timestamps: true },
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: { charset: 'utf8', timestamps: true },
  },
};

module.exports = database;
