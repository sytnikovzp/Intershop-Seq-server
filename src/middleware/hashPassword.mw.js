const bcrypt = require('bcrypt');
const createError = require('http-errors');
require('dotenv').config();
// ============================
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

module.exports.hashPassword = async (req, res, next) => {
  try {
    req.hashPass = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    next();
  } catch (error) {
    console.log(error.message);
    next(createError(500, 'Server Error on hash password!'));
  }
};
