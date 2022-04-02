const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

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
    name: Joi.string().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
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
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      })
      .message({
        'string.length': 'Длина поля - 24',
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
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
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }).message({
      'any.required': 'Поле "thumbnail" должно быть заполнено',
    }),
    movieId: Joi.string().required().alphanum().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      })
      .message({
        'string.length': 'Длина поля - 24',
      }),
  }),
});

module.exports = {
  validateCreateMovie,
  validateDeleteMovie,
  validateCreateUser,
  validateLogin,
  validateUpdateProfile,
};
