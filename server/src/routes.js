/**
 * Routes
 * @description :: Setup application routes
**/

const express = require('express');
const router = express.Router();

const { CompanyController, UserController } = require('./controllers');


// Company Controller
router.post('/companies', CompanyController.create);


// User Controller
router.post('/users', UserController.create);
router.post('/users/signin', UserController.signin);


module.exports = (app) => app.use(router);
