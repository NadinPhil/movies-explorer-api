const userRoutes = require('express').Router();
const {
  getUser, updateProfile,
} = require('../controllers/users');

const { validateUpdateProfile } = require('../middlewares/validation');

userRoutes.get('/users/me', getUser);
userRoutes.patch('/users/me', validateUpdateProfile, updateProfile);

exports.userRoutes = userRoutes;
