const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user } = require('../models/user');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.getUser = (req, res, next) => {
  user.findOne({ _id: req.user._id })
    .then((users) => {
      if (users) {
        res.status(200).send({
          name: users.name, email: users.email, _id: users._id,
        });
      } next(new NotFoundError('Нет пользователя с таким id!'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при поиске пользователя!'));
      } else {
        next(err);
      }
    });
};

exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  user.findOneAndUpdate({ _id: req.user._id }, { name, email }, { new: true, runValidators: true })
    .then((users) => res.status(200).send({ _id: users._id, email: users.email, name: users.name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении пользователя!'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует!'));
      } else {
        next(err);
      }
    });
};

exports.createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  user.create({
    name, email, password: hash,
  })
    .then((users) => res.status(200).send({
      name: users.name, email: users.email, _id: users._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует!'));
      } else {
        next(err);
      }
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((users) => {
      const token = jwt.sign(
        { _id: users._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Неправильные почта или пароль!'));
    });
};
