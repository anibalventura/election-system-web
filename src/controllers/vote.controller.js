export const getIndex = (req, res) => {
  res.render("home/vote/index", {
    pageTitle: "Vote",
    voteActive: true,
  });
};
