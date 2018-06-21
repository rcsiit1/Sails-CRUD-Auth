
module.exports = function authenticated(req, res, next) {
  var whitelist = ["/login"];
  var secondWhitelist = ["/authenticateUser"];
  
  if (whitelist.includes(req.url) || secondWhitelist.includes(req.url) ) {
    return next();
  }
  else {
    if (req.session.authenticated=== undefined) {
      var notAuthenticatedError = [{ name: 'Not authenticated', message: 'Your session has expired, you need to login again!' }];
      req.session.flash = {
        err: notAuthenticatedError
      };
      res.redirect('/login');
      //return next();
    }
    else {

      res.redirect('/authenticateUser/');
    }
  }
};
