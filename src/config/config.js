require('dotenv').config();

module.exports = {
  port: 5000,
  mongoURI: 'mongodb://127.0.0.1:27017/finance-app',
  jwtSecret: "pawnDSAepwiCSAn/>>fdsmvalnk<CSs",
  jwtExpiresIn: 2592000
};