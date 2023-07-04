const router = require('express').Router();

const { signinValidator } = require('../middlewares/validation');
const { login } = require('../controllers/users');

// signin
router.post('/signin', signinValidator, login);

module.exports = router;
