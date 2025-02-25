const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');
const { validate } = require('../middleware/validation');

const router = express.Router();

router.post(
  '/register',
  validate([
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ]),
  register
);

router.post(
  '/login',
  validate([
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ]),
  login
);

module.exports = router;