
const flash = require('flash');

function userLogin(req, res) {

  res.view('pages/login', { layout: false });
}

function authenticateUser(req, res) {

  if (!req.param('email') || !req.param('password')) {
    console.log("value not entered");
    var errorMessage = [{ name: 'Username password required', message: 'You must enter both username and password to login!' }];

    req.session.flash = {
      err: errorMessage
    };
    res.redirect('/login');
    return;

  }

  User.find(req.param('email')).exec((err, user) => {
    console.log("Into user query");
    if (err) {
      res.send(500, { error: 'Database Error Occured' });
    }
    if (!user) {
      console.log("User not found");
      var userError = [{ name: 'no Account', message: 'The email address' + req.param('email') + 'is not valid' }];
      req.session.flash = {
        err: userError
      };
    }
    else if (user.email == req.param('email') && user.password != req.param('password')) {
      console.log("Password not match");
      var passwordError = [{ name: 'Password mismatch', message: 'The password entered is incorrect' }];
      req.session.flash = {
        err: passwordError
      };
    }
    else {
      console.log("authenticated");
      req.session.authenticated = true;
      req.session.User = user;
      res.redirect('/');
    }
  });


}

function destroySession(req, res) {
  console.log(req.session.authenticated);
  req.session.authenticated = false;
  req.session.destroy(() => {
    //console.log(req.session.authenticated);
    res.redirect('/login');
  });

}

module.exports = {
  userLogin: userLogin,
  authenticateUser: authenticateUser,
  destroySession: destroySession

};

