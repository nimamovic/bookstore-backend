const router = require('express').Router();
const {
  postLogin
} = require('../controllers/auth_controller');

router.route('/login').post(postLogin);

module.exports = router;