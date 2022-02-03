const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");
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
exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload.id);
      user ? done(null, user) : done(null, false);
    } catch (error) {
      done(null, false);
    }
  }
);
