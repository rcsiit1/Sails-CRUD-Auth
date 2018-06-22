
module.exports = function authenticated(req, res, next) {
  var whitelist = ["/login"];
 
  
  if (whitelist.includes(req.url)) {
    return next();
  }
  else {
    if (req.session.authenticated=== undefined) {
      var notAuthenticatedError = [{ name: 'Not authenticated', message: 'Your session has expired, you need to login again!' }];
      req.session.flash = {
        err: notAuthenticatedError
      };
      res.redirect('/login');
     
    }
    else {

      return next();
    }
  }
};
