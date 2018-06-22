


function userLogin(req, res) {

  if (req.method === "POST") {
    return authenticateUser(req, res);
  }
  else {
    res.view('pages/login',{layout:false});
  }


}

async function authenticateUser(req, res) {

  if (!req.param('email') || !req.param('password')) {

    var errorMessage = [{ name: 'Username password required', message: 'You must enter both username and password to login!' }];

    req.session.flash = {
      err: errorMessage
    };
    return res.redirect('/login');
  }

  var user = await User.find({ email: req.param('email'), password: req.param('password') });



  if (!user[0]) {

    var userError = [{ name: 'no Account', message: 'The email address' + req.param('email') + 'is not valid' }];
    req.session.flash = {
      err: userError
    };
    return res.status(500).body(" User not Found!");
  }

  else {
    req.session.authenticated = true;
    req.session.User = user;
    return res.redirect('/');
  }


}

function destroySession(req, res) {

  req.session.authenticated = undefined;
  req.session.destroy(() => {
    return res.redirect('/login');
  });

}

module.exports = {
  userLogin: userLogin,
  authenticateUser: authenticateUser,
  destroySession: destroySession

};

