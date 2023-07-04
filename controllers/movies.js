const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { STATUS_CREATED } = require('../errors/errors');

// создаем карточку фильма POST http://localhost:3000/movies/
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const { _id } = req.user;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: _id,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => res.status(STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

// получаем все карточким GET http://localhost:3000/movies/
const getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    // .populate('owner', '_id')
    .populate(['owner', '_id'])
    // .then((movie) => res.status(STATUS_CREATED).send(movie))
    .then((movies) => {
      if (movies) return res.send(movies);
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .catch(next);
};

// удаление карточки фильма  DELETE http://localhost:3000/movies/movieId
const deleteMovie = (req, res, next) => {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id не найден');
      }
      const { owner: movieOwnerId } = movie;
      if (userId !== movieOwnerId.valueOf()) {
        throw new ForbiddenError('Нет прав доступа для удаления фильма');
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
