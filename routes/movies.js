const router = require('express').Router();
const { movieValidator, deleteMovieValidator } = require('../middlewares/validation');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

router.post('/', movieValidator, createMovie);
router.get('/', getMovies);
router.delete('/:id', deleteMovieValidator, deleteMovie);

module.exports = router;
