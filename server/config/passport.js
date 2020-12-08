const passportJwt = require('passport-jwt');

const userBUS = require('../bus/user');

const JwtStragegy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
};
const jwtStragegy = new JwtStragegy(jwtOptions, function (payload, done) {
  userBUS.findByCondition({ id: payload.id })
    .then(function (user) {
      if (!user) {
        return done(null, fasle);
      } else {
        return done(null, user);
      }
    })
    .catch(function (err) {
      console.trace(err);
      return done(null, fasle);
    });
});

module.exports = function (passport) {
  passport.use(jwtStragegy);
};