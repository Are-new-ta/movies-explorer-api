const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { signupValidator } = require('../middlewares/validation');

// регистрация
router.post('/signup', signupValidator, createUser);

module.exports = router;
