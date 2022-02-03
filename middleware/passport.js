const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const checkPassword = user
      ? await bcrypt.compare(password, user.password)
      : false;
    checkPassword ? done(null, user) : done(null, false);
  } catch (error) {
    done(error);
  }
});
