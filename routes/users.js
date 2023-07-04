const router = require('express').Router();

const { userUpdateValidator } = require('../middlewares/validation');
const {
  updateUser,
  getOwner,
} = require('../controllers/users');

router.get('/me', getOwner);
router.patch('/me', userUpdateValidator, updateUser);

module.exports = router;
