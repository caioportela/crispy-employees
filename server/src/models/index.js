/**
 * Models
 * @description :: Configuring application models
**/

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const database = require('../../config/database');
const logger = require('../loaders/logger');

const basename = path.basename(__filename);

const files = fs.readdirSync(__dirname).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
});

// Connect to the database
const sequelize = new Sequelize(database[process.env.NODE_ENV || 'development']);
const db = {};

// Initialize all models
files.forEach((file) => {
  logger.debug(`Loading Model: ${path.parse(file).name}`);

  const model = require(path.join(__dirname, file));
  model.init(sequelize);

  db[model.name] = model;
});

for(let modelName in db) {
  if(db[modelName].associate) {
    db[modelName].associate(db);
  }

  if(db[modelName].hooks) {
    db[modelName].hooks();
  }
}

// Synchronize all models
sequelize.sync();

module.exports = db;
