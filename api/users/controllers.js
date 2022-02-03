const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  return jwt.sign(JSON.stringify(payload), JWT_SECRET);
};
exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken;
    res.status(201).json({ token: token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json({ token: token });
  } catch (error) {
    next(error);
  }
};
