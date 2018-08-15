module.exports = function isLoggedIn (req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.user || req.originalUrl == "/recoverPassword" || req.originalUrl == "/signup" || req.originalUrl == "/logout") {
    return next();
  } else {
    return res.redirect('/login');
  }

};
