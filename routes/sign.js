const signRoutes = require('express').Router();

const {
  createUser, login,
} = require('../controllers/users');

const { validateCreateUser, validateLogin } = require('../middlewares/validation');

signRoutes.post('/signup', validateCreateUser, createUser);
signRoutes.post('/signin', validateLogin, login);

exports.signRoutes = signRoutes;
