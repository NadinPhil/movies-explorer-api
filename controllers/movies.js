const { movie } = require('../models/movie');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

exports.getMovies = (req, res, next) => {
  movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

exports.deleteMovie = (req, res, next) => {
  movie.findById(req.params._id)
    .then((data) => {
      if (data) {
        if (data.owner.equals(req.user._id)) {
          return data.deleteOne({}).then(() => res.send({ message: 'Фильм удален' }));
        } next(new ForbiddenError('Запрещено удалять фильмы других пользователей!'));
      } return next(new NotFoundError('Фильм с указанным _id не найден!'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении фильма!'));
      } else {
        next(err);
      }
    });
};

exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    id,
    liked,
  } = req.body;
  const ownerId = req.user._id;
  const moviesId = req.params._id;
  movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: ownerId,
    id,
    _id: moviesId,
    liked,
  })
    .then((movies) => {
      res.send({
        country: movies.country,
        director: movies.director,
        duration: movies.duration,
        year: movies.year,
        description: movies.description,
        image: movies.image,
        trailerLink: movies.trailerLink,
        nameRU: movies.nameRU,
        nameEN: movies.nameEN,
        thumbnail: movies.thumbnail,
        owner: movies.owner,
        id: movies.id,
        _id: movies._id,
        liked: movies.liked,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма!'));
      } else {
        next(err);
      }
    });
};
