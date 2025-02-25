const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const user = await User.create({
    name,
    email,
    password
  });
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400).json({ error: 'Invalid user data' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
};