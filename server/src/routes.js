/**
 * Routes
 * @description :: Setup application routes
**/

const express = require('express');
const router = express.Router();

const { isAdmin, isAuthenticated } = require('./middlewares');

const { CompanyController, UserController } = require('./controllers');


// Company Controller
router.post('/companies', CompanyController.create);


// User Controller
router.get('/users', [isAuthenticated], UserController.find);
router.get('/users/:id', [isAuthenticated], UserController.findOne);
router.post('/users', [isAuthenticated], UserController.create);
router.post('/users/signin', UserController.signin);
router.put('/users/:id', [isAuthenticated], UserController.update);
router.delete('/users/:id', [isAuthenticated, isAdmin], UserController.destroy);


module.exports = (app) => app.use(router);
