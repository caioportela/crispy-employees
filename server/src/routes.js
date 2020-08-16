/**
 * Routes
 * @description :: Setup application routes
**/

const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('./middlewares');

const { CompanyController, UserController } = require('./controllers');


// Company Controller
router.post('/companies', CompanyController.create);


// User Controller
router.post('/users', [isAuthenticated], UserController.create);
router.post('/users/signin', UserController.signin);


module.exports = (app) => app.use(router);
