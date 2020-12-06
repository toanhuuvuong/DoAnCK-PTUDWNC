const passport = require('passport');

const jwtAuthenticate = function(req, res, next) {
  passport.authenticate('jwt', { session: false }, function(err, user, info) { 
    if (err) { 
      return next(err); 
    } 

    if (!user) { 
      res.json({ok: false, messageCode: 'not_authenticated'});
    } else {
      next();
    }
  })(req, res, next);
};

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    return jwtAuthenticate(req, res, next);
  },
  forwardAuthenticated: function(req, res, next) {
  
  }
};