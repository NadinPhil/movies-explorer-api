const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: false,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String || null,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Невалидный URL!',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Невалидный URL!',
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Невалидный URL!',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  liked: {
    type: Boolean,
    required: true,
  },
});

exports.movie = mongoose.model('movie', movieSchema);
