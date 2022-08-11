export const isVote = (req, res, next) => {
  if (req.session.isLoggedIn) {
    req.flash("errors", "You are not authorized to access this section.");
    return res.redirect("/admin");
  }

  next();
};
