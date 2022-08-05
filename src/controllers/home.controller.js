export const getIndex = (req, res) => {
  res.render("home/index", {
    pageTitle: "Home",
    homeActive: true,
  });
};
