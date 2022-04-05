const express = require('express');
const movieRoutes = require('express').Router();
const {
  getMovies, deleteMovie, createMovie,
} = require('../controllers/movies');
const { validateDeleteMovie } = require('../middlewares/validation');
const { validateCreateMovie } = require('../middlewares/validation');

movieRoutes.get('/movies', getMovies);
movieRoutes.delete('/movies/:_id', validateDeleteMovie, deleteMovie);
movieRoutes.post('/movies', express.json(), validateCreateMovie, createMovie);

exports.movieRoutes = movieRoutes;
