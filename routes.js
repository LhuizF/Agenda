const express = require('express');
const route = express.Router();
const homeController = require('./src/controller/homeController');
const loginController = require('./src/controller/loginController');
const contactController = require('./src/controller/contactController');

const { loginRequired } = require('./src/middlewares/middleware')


// Home rotas
route.get('/', homeController.index)

//rotas de login
route.get('/login/', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//rotas de contatos
route.get('/contact',loginRequired, contactController.index);
route.post('/contact/register',loginRequired, contactController.register);

module.exports = route;