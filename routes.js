const express = require('express');
const route = express.Router();
const homeController = require('./src/controller/homeController');
const loginController = require('./src/controller/loginController');
const contactController = require('./src/controller/contactController');
const registerController = require('./src/controller/registerController')

const { loginRequired } = require('./src/middlewares/middleware')


// Home rotas
route.get('/', homeController.index)

//rotas de login
route.get('/login/', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//register
route.get('/register/', registerController.index)
route.post('/register/register', registerController.register);

//rotas de contatos
route.get('/contact',loginRequired, contactController.index);
route.post('/contact/register',loginRequired, contactController.register);
route.get('/contact/:id',loginRequired, contactController.editContact);
route.post('/contact/edit/:id',loginRequired, contactController.edit);
route.get('/contact/delete/:id',loginRequired, contactController.delete);

module.exports = route;