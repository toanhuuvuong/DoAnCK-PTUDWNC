const passport = require('passport');
const passportStrategy = require('../config/passport');
const { STATUS_CODE } = require('../utils/constant');
const { responseWithStatus } = require('../utils/utils');
passportStrategy(passport);

const ensureAuthenticated = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      responseWithStatus(res, STATUS_CODE.UNAUTHORIZE);
    } else {
      next();
    }
  })(req, res, next);
};

const forwardAuthenticated = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      next();
    } else {
      responseWithStatus(res, STATUS_CODE.UNCHANGE);
    }
  })(req, res, next);
};

module.exports = {
  ensureAuthenticated,
  forwardAuthenticated
};