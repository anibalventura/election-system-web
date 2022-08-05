export const getIndex = (req, res) => {
  res.render("admin/index", {
    pageTitle: "Admin",
    homeActive: true,
  });
};
