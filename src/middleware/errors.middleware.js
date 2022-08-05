const errors = (req, res, next) => {
  const errors = req.flash("errors");
  res.locals.isAuth = req.session.isLoggedIn;
  res.locals.errorMsgs = errors;
  res.locals.hasErrorMsgs = errors.length > 0;
  next();
};

export default errors;
