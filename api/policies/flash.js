

module.exports = (req, res) => {

  res.locals.flash = {};
  if (!req.session.flash) {
    return next();
  }
  res.locals.flash = _.clone(req.session.flash);
  req.session.flash = {};
  next();
};
