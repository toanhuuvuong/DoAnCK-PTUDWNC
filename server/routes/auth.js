const express = require('express');
const passport = require('passport');

const router = express.Router();

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_URL;
const CLIENT_LOGIN_PAGE_URL = process.env.CLIENT_URL + '/login';

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: CLIENT_HOME_PAGE_URL,
  failureRedirect: '/auth/google/login/failed'
}));

router.get('/google/login/success', function(req, res, next) {
  if(req.user) {
    return res.json({
      status: 200,
      messageCode: 'google_login_success',
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get('/google/login/fail', function(req, res, next) {
  return res.json({status: 401, messageCode: 'google_login_fail'});
});

router.get("/google/logout", function(req, res, next) {
  // Logout Google & Facebook
  req.logout();
  res.redirect(CLIENT_LOGIN_PAGE_URL);
});

module.exports = router;