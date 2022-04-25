const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required(),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    name: Joi.string().min(2).max(30),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }).message({
      'any.required': 'Поле "image" должно быть заполнено',
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }).message({
      'any.required': 'Поле "trailerLink" должно быть заполнено',
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }).message({
      'any.required': 'Поле "thumbnail" должно быть заполнено',
    }),
    id: Joi.number().required(),
    liked: Joi.boolean().required(),
  }),
});

module.exports = {
  validateCreateMovie,
  validateDeleteMovie,
  validateCreateUser,
  validateLogin,
  validateUpdateProfile,
};
