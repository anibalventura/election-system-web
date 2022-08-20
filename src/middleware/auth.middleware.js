import User from "../models/user.model.js";

export const isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    req.flash("errors", "You are not authorized to access this section.");
    return res.redirect("/");
  }

  next();
};

export const checkSession = (req, res, next) => {
  if (!req.session) {
    return next();
  }

  if (!req.session.user) {
    return next();
  }

  User.findByPk(req.session.user.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
};
