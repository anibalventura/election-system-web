export const getIndex = (req, res) => {
  res.render("home/index", {
    pageTitle: "Home",
    homeActive: true,
  });
};

export const postVote = (req, res) => {
  res.render("home/vote/index", {
    pageTitle: "Vote",
    voteActive: true,
  });
};
