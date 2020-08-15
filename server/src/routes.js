/**
 * Routes
 * @description :: Setup application routes
**/

const express = require('express');
const router = express.Router();

const { UserController } = require('./controllers');

module.exports = (app) => app.use(router);
