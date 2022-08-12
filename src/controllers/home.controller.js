export const getIndex = (req, res) => {
  res.render("home/index", {
    pageTitle: "Home",
    homeActive: true,
  });
};

export const postCitizen = (req, res) => {
  const identificationDocument = req.body.identificationDocument;
  res.redirect(`/home/vote?citizenId=${identificationDocument}`);
};
