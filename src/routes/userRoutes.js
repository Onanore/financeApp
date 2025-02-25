const express = require('express');
const { check } = require('express-validator');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);

router.put(
  '/profile',
  validate([
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 })
  ]),
  updateProfile
);

module.exports = router;