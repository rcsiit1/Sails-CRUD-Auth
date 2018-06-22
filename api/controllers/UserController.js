


function userLogin(req, res) {

  if (req.method === "POST") {
    return authenticateUser(req, res);
  }
  else {
    res.view('pages/login', { errors: {}, layout: false });
  }


}

async function authenticateUser(req, res) {

  if (!req.param('email') || !req.param('password')) {
    var errorMessage = { message: 'You must enter both username and password to login!' };
    return res.view('pages/login', { errors: errorMessage, layout: false });
  }

  var user = await User.find({ email: req.param('email'), password: req.param('password') });

  if (!user[0]) {
    var userError = { message: 'No account with email' + '   ' + req.param('email') + '   ' + 'is registered' };
    return res.view('pages/login', { errors: userError, layout: false });
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

