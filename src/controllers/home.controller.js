export const getIndex = (req, res) => {
  if (req.session.isLoggedIn) {
    req.flash("errors", "You are not authorized to access this section.");
    return res.redirect("/admin");
  }

  res.render("home/index", {
    pageTitle: "Home",
    homeActive: true,
  });
};
